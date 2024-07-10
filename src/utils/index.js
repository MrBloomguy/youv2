import axios from "axios";
import { adminWallet, bscId, subgraphURLs, tokenDecimals } from "./constant";
import { formatUnits } from "viem";

const getDataFromSubgraph = async (query, subgraphURL) => {
    try {
        const result = await axios.post(subgraphURL, {
            query,
        });

        return { isSuccess: true, data: result.data.data };
    } catch (error) {
        return { isSuccess: false, data: "" };
    }
};

export const getProjects = async () => {
    const query = `{
        projects(where: {isVisible: true}, orderBy: blockTime, orderDirection: desc) {
          id
          creator
          currentAmount {
            amount
            token
          }
          desc
          filterTags
          noOfContributors
          projectCoverUrl
          socialUrl
          title
          websiteUrl
          isVerified
          isVisible
          isBlocked
          qfRoundID
          qfMatched
        }
        qfrounds(first: 1, orderBy: blockTime, orderDirection: desc) {
          id
          amount
          totalRootSum
          startTime
          endTime
        }
      }`;
    try {
        let projects = []
        let adminProjects = []
        let otherProjects = []
        await Promise.all(
            Object.entries(subgraphURLs).map(async ([key, value]) => {
                const res = await getDataFromSubgraph(query, value);
                if (res.isSuccess) {
                    let index = 0;
                    let projectsList = res.data.projects;
                    const qfRounds = res.data.qfrounds;
                    const qfRound = qfRounds.length > 0 ? qfRounds[0] : null;

                    projectsList = projectsList.map((project) => {
                        const currentTime = Math.floor(Date.now() / 1000)

                        let currentAmount = 0;
                        for (const token of project.currentAmount) {
                            currentAmount += +formatUnits(
                                token.amount,
                                tokenDecimals[key][token.token]
                            )
                        }

                        let projectData;
                        if (qfRound && qfRound.id == project.qfRoundID) {
                            const isOnQF = currentTime >= +(qfRound.startTime) && currentTime <= +(qfRound.endTime);
                            projectData = { ...project, currentRaised: currentAmount, chainId: key, index: index++, isOnQF: isOnQF, matchingPool: qfRound.amount, qfRaised: qfRound.totalRootSum == 0 ? 0 : project.qfMatched / qfRound.totalRootSum * qfRound.amount };

                        }

                        projectData = { ...project, currentRaised: currentAmount, chainId: key, index: index++, isOnQF: false, matchingPool: 0, qfRaised: 0 }

                        if (project.creator == adminWallet)
                            adminProjects.push(projectData);
                        else
                            otherProjects.push(projectData)
                    }
                    )
                }
            })
        )
        projects = adminProjects.concat(otherProjects);
        return projects
    } catch (e) {
        console.log(e, "=========error in get projects============")
        return [];
    }
};

export const getProject = async (projectContractAddress, chainId) => {
    const query = `{
        project(id: "${projectContractAddress}") {
          id
          desc
          currentState
          currentAmount
          creator
          filterTags
          goalAmount
          noOfContributors
          projectCoverUrl
          projectDeadline
          qfRoundID
          qfMatched
          socialUrl
          githubUrl
          title
          websiteUrl
          isVerified
        }
        qfrounds(first: 1, orderBy: blockTime, orderDirection: desc) {
          id
          amount
          totalRootSum
          startTime
          endTime
        }
      }`;

    try {
        const res = await getDataFromSubgraph(query, subgraphURLs[chainId]);
        if (res.isSuccess) {
            const project = res.data.project;
            if (project) {
                const data = project;
                if (data.filterTags == "popular") data.filterTags = "hackathons"
                const qfRounds = res.data.qfrounds;
                const qfRound = qfRounds.length > 0 ? qfRounds[0] : null;
                if (qfRound && qfRound.id == data.qfRoundID) {
                    const currentTime = Math.floor(Date.now() / 1000)
                    const isOnQF = currentTime >= +(qfRound.startTime) && currentTime <= +(qfRound.endTime);
                    return { ...data, isOnQF: isOnQF, matchingPool: qfRound.amount, qfRaised: qfRound.totalRootSum == 0 ? 0 : data.qfMatched / qfRound.totalRootSum * qfRound.amount }
                }

                return { ...data, isOnQF: false, matchingPool: 0 };
            }
            return null
        }
        return null;
    } catch (e) {
        console.log(e, "=========error in get projects============")
        return [];
    }
}

export const getQFRounds = async () => {
    const query = `{
        qfrounds(first: 1, orderBy: blockTime, orderDirection: desc) {
            id
            title
            imgUrl
            desc
            amount
            totalContributions
            contriNumber
            token
            projectNum
            startTime
            endTime
        }
      }`;
    try {
        let qfRoundsList = []
        let totalMatchingPool = 0;
        let totalContributions = 0;
        let contriNumber = 0;
        await Promise.all(
            Object.entries(subgraphURLs).map(async ([key, value]) => {
                const res = await getDataFromSubgraph(query, value);
                if (res.isSuccess) {
                    const qfRounds = res.data.qfrounds;
                    if (qfRounds.length > 0) {
                        const currentTime = Math.floor(Date.now() / 1000)
                        let leftTime;
                        if (currentTime >= +qfRounds[0].endTime) {
                            leftTime = 0;
                        } else {
                            leftTime = +qfRounds[0].endTime - currentTime;
                        }
                        totalMatchingPool += +formatUnits(qfRounds[0].amount, (key == bscId ? 18 : 6))
                        totalContributions += +formatUnits(qfRounds[0].totalContributions, (key == bscId ? 18 : 6))
                        contriNumber += qfRounds[0].contriNumber;

                        const daysLeft = Math.floor(leftTime / (24 * 60 * 60));
                        const hoursLeft = Math.floor((leftTime % (24 * 60 * 60)) / 3600);
                        qfRoundsList.push({ ...qfRounds[0], chainId: key, leftDays: daysLeft, leftHours: hoursLeft });
                    }
                }
            })
        )

        return { qfRoundsList: qfRoundsList, totalMatchingPool: totalMatchingPool, totalContributions: totalContributions, contriNumber: contriNumber }
    } catch (e) {
        console.log(e, "=========error in get qfRoundsList============")
        return { qfRoundsList: [], totalMatchingPool: 0, totalContributions: 0, contriNumber: 0 };
    }
};

export const getContributors = async (chainId) => {
    const query = `{
        contributors(orderBy: totalContribution, orderDirection: desc) {
          id
          referralNumber
          totalContribution
          totalBuidlPointRewards
          totalUSDTRewards
          totalBuidlPointReferralRewards
        }
      }`;
    try {
        const res = await getDataFromSubgraph(query, subgraphURLs[chainId]);
        if (res.isSuccess) {
            return res.data.contributors;
        }

        return []
    } catch (e) {
        console.log(e, "=========error in get contributors============")
        return [];
    }
};

export const getContributionDetails = async (address, chainId) => {
    const query = `{
        contributor(id: "${address}") {
          referralNumber
          totalBuidlPointReferralRewards
          totalBuidlPointRewards
          totalContribution
          totalUSDTRewards
          claimableBuidlPointReferralRewards
          claimableBuidlPointRewards
          claimableUSDTRewards
          contributions {
            id
          }
        }
      }`;
    try {
        const res = await getDataFromSubgraph(query, subgraphURLs[chainId]);
        if (res.isSuccess) {
            return res.data.contributor;
        }

        return null
    } catch (e) {
        console.log(e, "=========error in get contributor============")
        return null;
    }
}

export const getEllipsisTxt = (str, n = 6) => {
    if (str) {
        return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return '';
};