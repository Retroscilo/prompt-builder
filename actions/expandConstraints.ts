import { isFunction } from "radash";

export function expandConstraints<T extends Collection>(collection: T, config: Config<T>): string {
	if (!config.constraints) return "";
	let prompt = "";
	for (let constraint in collection.constraints) {
		if (isFunction(collection.constraints[constraint])) {
			prompt += collection.constraints[constraint](config.constraints[constraint]);
		} else {
			prompt += collection.constraints[constraint];
		}
	}
	return prompt;
}
