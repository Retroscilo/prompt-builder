type FunctionParameters<T extends Function> = T extends (...args: infer P) => any ? P : never;

interface Config<T extends Collection> {
	context: keyof T["context"];
	format?: (keyof T["format"])[] | "*";
	constraints?: {
		[K in keyof T["constraints"]]?: T["constraints"][K] extends Function
			? Parameters<T["constraints"][K]>[0]
			: never;
	};
	interfaces?: (keyof T["interfaces"])[] | "*";
}
