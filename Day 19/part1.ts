import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n");

const moleculeReplacementMap = new Map<string, string[]>();
let medicineMolecule = "";

for (const line of lines) {
	const tokens = line.split("=>");

	if (tokens.length > 1) {
		const molecule = tokens[0].trim();
		const replacements = moleculeReplacementMap.get(molecule) || [];

		replacements.push(tokens[1].trim());
		moleculeReplacementMap.set(molecule, replacements);
	} else if (tokens.length === 1) {
		medicineMolecule = tokens[0];
	}
}

const distinctMolecules = new Set<string>();

for (const [molecule, replacements] of moleculeReplacementMap) {
	const regex = new RegExp(molecule, "g");
	const matches = medicineMolecule.matchAll(regex);

	for (const match of matches) {
		for (const replacement of replacements) {
			distinctMolecules.add(
				medicineMolecule.slice(0, match.index) +
					replacement +
					medicineMolecule.slice(match.index + molecule.length)
			);
		}
	}
}

console.log(distinctMolecules.size);
