export const achievements = [
    {
        id: 1,
        name: "First Steps",
        description: "Complete your first challenge.",
        unlocked: false,
        condition: (completedChallenges) => completedChallenges.length >= 1,
    },
    {
        id: 2,
        name: "5 in a Row",
        description: "Complete 5 challenges.",
        unlocked: false,
        condition: (completedChallenges) => completedChallenges.length >= 5,
    },
    {
        id: 3,
        name: "Array Master",
        description: "Complete the sum array challenge.",
        unlocked: false,
        condition: (completedChallenges) => completedChallenges.includes(3), // Challenge ID for sumArray
    },
];

export function checkAchievements(completedChallenges) {
    const newlyUnlocked = [];
    for (const achievement of achievements) {
        if (!achievement.unlocked && achievement.condition(completedChallenges)) {
            achievement.unlocked = true;
            newlyUnlocked.push(achievement);
        }
    }
    return newlyUnlocked;
}
