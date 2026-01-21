import { createFileRoute } from "@tanstack/react-router";

import PuzzleGame from "@/components/puzzle-game";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	return <PuzzleGame />;
}
