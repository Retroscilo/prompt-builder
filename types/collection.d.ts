interface Collection {
	context: Record<string, string>;
	format: Record<string, string>;
	constraints: Record<string, Function | string>;
	interfaces: Record<string, string>;
}
