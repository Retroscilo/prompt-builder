import createPrompt from "..";
import { expandConstraints, expandContext, expandInterfaces, expandFormat } from "../utils/expand";
import { CROSSFIT } from "./const/collection";
import * as configs from "./const/config";
import { describe, test, expect } from "bun:test";

describe("expand functions", () => {
	test("expand constraints", () => {
		const constraints = expandConstraints(
			CROSSFIT,
			configs.CROSSFIT_COMPLETE_VALID as Config<typeof CROSSFIT>
		);
		expect(constraints).toBe(
			"You must focus on chest, back.You must use the following equipments: dumbell.The goals difficulty must be easy.A TABATA is 20 seconds of effort, 10 seconds of rest, repeat 8 times each group of exercises. You must think of this rule in your answer."
		);
	});

	test("expand exercises", () => {
		const context = expandContext(
			CROSSFIT,
			configs.CROSSFIT_COMPLETE_VALID as Config<typeof CROSSFIT>
		);
		expect(context).toBe(
			"I want to generate a crossfit based workout. I need you to think about a variety of exercises that will target a muscle group you will be prompted later. You will need to generate a workout that includes a warmup, an optional skill section, and a WOD. The exercises should respect some constraints about difficulty, time and equipments you will be prompted later. You must be clear and logical in your exercise choices regarding the targeted muscle group, and explain briefly in the description why you choosed it."
		);
	});

	test("expand interfaces", () => {
		const interfaces = expandInterfaces(
			CROSSFIT,
			configs.CROSSFIT_COMPLETE_VALID as Config<typeof CROSSFIT>
		);
		expect(interfaces).toBe(
			'interface TABATA {\n    type: "TABATA";\n    description: "20 secondes d\'effort, 10 secondes de repos, répétez 8 fois chaque groupe d\'exercices.";\n    groupA: Exercice[4];\n    groupB: Exercice[4];\n    groupC: Exercice[4];\n    groupD: Exercice[4];\n  }\n  interface Wod {\n    warmup: { content: Exercise[3..5]; rounds: Number; notes?: String };\n    skill?: { content: Exercise; rounds?: Number; notes?: String };\n    wod: TABATA;\n  }interface Exercise {\n    type: "exercice";\n    title: String;\n    captime?: Number;\n    goals?: { number: Number; unit: "reps" | "meters" | "seconds" | "minutes" | "calories" };\n    description: String;\n  }\n  The description should contain a brief description on how to perform the exercise. The captime is in seconds.\n  '
		);
	});

	test("expand format", () => {
		const format = expandFormat(
			CROSSFIT,
			configs.CROSSFIT_COMPLETE_VALID as Config<typeof CROSSFIT>
		);
		expect(format).toBe(
			"I need you to act like an API endpoint generating JSON. That means your entire answer MUST be serializable in JSON : the last character of your output must be the closing curly brace of the json, nothing else.\n    You MUST respect the typescript interface definitions provided below to compose your workout. Your output MUST match the interfaces : - You can't add unit type. - You can't add or ignore keys, properties or values."
		);
	});
});

describe("create prompt", () => {
	test("create prompt", () => {
		const prompt = createPrompt(
			CROSSFIT,
			configs.CROSSFIT_COMPLETE_VALID as Config<typeof CROSSFIT>
		);
		expect(prompt).toBe(
			'I want to generate a crossfit based workout. I need you to think about a variety of exercises that will target a muscle group you will be prompted later. You will need to generate a workout that includes a warmup, an optional skill section, and a WOD. The exercises should respect some constraints about difficulty, time and equipments you will be prompted later. You must be clear and logical in your exercise choices regarding the targeted muscle group, and explain briefly in the description why you choosed it. I need you to act like an API endpoint generating JSON. That means your entire answer MUST be serializable in JSON : the last character of your output must be the closing curly brace of the json, nothing else.\n    You MUST respect the typescript interface definitions provided below to compose your workout. Your output MUST match the interfaces : - You can\'t add unit type. - You can\'t add or ignore keys, properties or values. You must focus on chest, back.You must use the following equipments: dumbell.The goals difficulty must be easy.A TABATA is 20 seconds of effort, 10 seconds of rest, repeat 8 times each group of exercises. You must think of this rule in your answer. interface TABATA {\n    type: "TABATA";\n    description: "20 secondes d\'effort, 10 secondes de repos, répétez 8 fois chaque groupe d\'exercices.";\n    groupA: Exercice[4];\n    groupB: Exercice[4];\n    groupC: Exercice[4];\n    groupD: Exercice[4];\n  }\n  interface Wod {\n    warmup: { content: Exercise[3..5]; rounds: Number; notes?: String };\n    skill?: { content: Exercise; rounds?: Number; notes?: String };\n    wod: TABATA;\n  }interface Exercise {\n    type: "exercice";\n    title: String;\n    captime?: Number;\n    goals?: { number: Number; unit: "reps" | "meters" | "seconds" | "minutes" | "calories" };\n    description: String;\n  }\n  The description should contain a brief description on how to perform the exercise. The captime is in seconds.\n  '
		);
	});

	test("create prompt without interfaces", () => {
		const prompt = createPrompt(
			CROSSFIT,
			configs.CROSSFIT_NO_INTERFACES as Config<typeof CROSSFIT>
		);
		expect(prompt).toBe(
			"I want to generate a crossfit based workout. I need you to think about a variety of exercises that will target a muscle group you will be prompted later. You will need to generate a workout that includes a warmup, an optional skill section, and a WOD. The exercises should respect some constraints about difficulty, time and equipments you will be prompted later. You must be clear and logical in your exercise choices regarding the targeted muscle group, and explain briefly in the description why you choosed it. I need you to act like an API endpoint generating JSON. That means your entire answer MUST be serializable in JSON : the last character of your output must be the closing curly brace of the json, nothing else.\n    You MUST respect the typescript interface definitions provided below to compose your workout. Your output MUST match the interfaces : - You can't add unit type. - You can't add or ignore keys, properties or values. You must focus on chest, back.You must use the following equipments: dumbell.The goals difficulty must be easy.A TABATA is 20 seconds of effort, 10 seconds of rest, repeat 8 times each group of exercises. You must think of this rule in your answer. "
		);
	});

	test("create prompt with invalid context", () => {
		expect(() =>
			createPrompt(CROSSFIT, configs.CROSSFIT_INVALID_CONTEXT as Config<typeof CROSSFIT>)
		).toThrow();
	});

	test("create prompt with no context", () => {
		expect(() =>
			createPrompt(CROSSFIT, configs.CROSSFIT_NO_CONTEXT as Config<typeof CROSSFIT>)
		).toThrow();
	});
});
