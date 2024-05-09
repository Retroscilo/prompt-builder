export const CROSSFIT = {
	context: {
		crossfit:
			"I want to generate a crossfit based workout. I need you to think about a variety of exercises that will target a muscle group you will be prompted later. You will need to generate a workout that includes a warmup, an optional skill section, and a WOD. The exercises should respect some constraints about difficulty, time and equipments you will be prompted later. You must be clear and logical in your exercise choices regarding the targeted muscle group, and explain briefly in the description why you choosed it.",
		exercise:
			"You are a coach and you need to generate only one exercice for your athletes. The exercise must respect the constraints you will be prompted later.",
	},
	format: {
		json: `I need you to act like an API endpoint generating JSON. That means your entire answer MUST be serializable in JSON : the last character of your output must be the closing curly brace of the json, nothing else.
    You MUST respect the typescript interface definitions provided below to compose your workout. Your output MUST match the interfaces : - You can't add unit type. - You can't add or ignore keys, properties or values.`,
		exercises: `- You must insert n exercises in the array when you encounter [n] in the interface definition. - You must insert random number in range in n to y exercises in the array when you encounter [n..y] in the interface`,
		language: `Descriptions must be in french exclusively. Exercises titles must be in english.`,
	},
	constraints: {
		muscleGroup: (groups: string[]) => `You must focus on ${groups.join(", ")}.`,
		equipments: (equipments: string[]) =>
			`You must use the following equipments: ${equipments.join(", ")}.`,
		difficulty: (difficulty: string) => `The goals difficulty must be ${difficulty}.`,
		type: (type: "TABATA") => {
			switch (type) {
				case "TABATA":
					return `A TABATA is 20 seconds of effort, 10 seconds of rest, repeat 8 times each group of exercises. You must think of this rule in your answer.`;
			}
		},
	},
	interfaces: {
		crossfit: `interface Wod {
    warmup: { content: Exercise[3..5]; rounds: Number; notes?: String };
    skill?: { content: Exercise; rounds?: Number; notes?: String };
    wod: TABATA;
  }`,
		exercise: `interface Exercise {
    type: "exercice";
    title: String;
    captime?: Number;
    goals?: { number: Number; unit: "reps" | "meters" | "seconds" | "minutes" | "calories" };
    description: String;
  }
  The description should contain a brief description on how to perform the exercise. The captime is in seconds.
  `,
		tabata: `interface TABATA {
    type: "TABATA";
    description: "20 secondes d'effort, 10 secondes de repos, répétez 8 fois chaque groupe d'exercices.";
    groupA: Exercice[4];
    groupB: Exercice[4];
    groupC: Exercice[4];
    groupD: Exercice[4];
  }
  `,
		tabata_exercise: `interface Exercise {
    type: "exercice";
    title: String;
    description: String;
  }
  The description should contain a brief explanation on how to perform the exercise.
  `,
	},
};
