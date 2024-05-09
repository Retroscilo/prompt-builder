import { expand } from "../utils/expand";

export function expandInterfaces<T extends Collection>(collection: T, config: Config<T>): string {
	if (!config.interfaces) return "";
	return expand(collection, "interfaces", config.interfaces);
}
