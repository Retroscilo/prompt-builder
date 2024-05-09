import { isArray, isFunction } from "radash";

export function expand<T extends Collection>(
	collection: T,
	group: "context",
	units: Config<T>["context"]
): string;
export function expand<T extends Collection>(
	collection: T,
	group: "constraints",
	units: string[]
): string;
export function expand<T extends Collection>(
	collection: T,
	group: "interfaces",
	units: Config<T>["interfaces"]
): string;
export function expand<T extends Collection>(
	collection: T,
	group: "format",
	units: Config<T>["format"] | "*"
): string;
export function expand<T extends Collection>(
	collection: T,
	group: keyof Collection,
	units: unknown
): string {
	const _group = collection[group];
	validateGroup(group, collection);

	let unitsArray = isArray(units) ? units : [units];

	if (unitsArray[0] === "*") return Object.values(_group).join("");

	return unitsArray.reduce((acc, unit) => {
		validateUnit(unit);
		const _unit = getUnit(_group, unit);
		return acc + _unit;
	}, "");
}

export function expandInterfaces<T extends Collection>(collection: T, config: Config<T>): string {
	if (!config.interfaces) return "";
	return expand(collection, "interfaces", config.interfaces);
}

export function expandFormat<T extends Collection>(collection: T, config: Config<T>) {
	if (!config.format) return "";
	return expand(collection, "format", config.format);
}

export function expandContext<T extends Collection>(collection: T, config: Config<T>) {
	if (!config.context) throw new Error("Context is required to build a prompt.");
	return expand(collection, "context", config.context);
}

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

function validateGroup(group: keyof Collection, collection: Collection) {
	if (!collection[group]) throw new Error(`invalid group: ${group}`);
}

function validateUnit(unit: unknown) {
	if (!unit) throw new Error("you must provide units to expand");
}

function getUnit(group: any, unit: any) {
	const _unit = group[unit];
	if (!_unit) throw new Error(`invalid unit: ${unit}`);
	return _unit;
}
