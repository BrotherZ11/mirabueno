declare module "aos" {
	interface AOSOptions {
		once?: boolean;
		duration?: number;
		easing?: string;
		offset?: number;
	}

	interface AOSInstance {
		init(options?: AOSOptions): void;
		refresh(): void;
		refreshHard(): void;
	}

	const AOS: AOSInstance;
	export default AOS;
}