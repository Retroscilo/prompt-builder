export const CROSSFIT_COMPLETE_VALID = {
	context: "crossfit",
	format: ["json"],
	constraints: {
		muscleGroup: ["chest", "back"],
		difficulty: "easy",
		equipments: ["dumbell"],
		type: "TABATA",
	},
	interfaces: ["tabata", "crossfit", "exercise"],
};

export const CROSSFIT_NO_INTERFACES = {
	context: "crossfit",
	format: ["json"],
	constraints: {
		muscleGroup: ["chest", "back"],
		difficulty: "easy",
		equipments: ["dumbell"],
		type: "TABATA",
	},
};

export const CROSSFIT_NO_CONTEXT = {
	format: ["json"],
	constraints: {
		muscleGroup: ["chest", "back"],
		difficulty: "easy",
		equipments: ["dumbell"],
	},
};

export const CROSSFIT_INVALID_CONTEXT = {
	context: "invalid",
	format: ["json"],
	constraints: {
		muscleGroup: ["chest", "back"],
		difficulty: "easy",
		equipments: ["dumbell"],
		type: "TABATA",
	},
	interfaces: ["tabata", "crossfit", "exercise"],
};
