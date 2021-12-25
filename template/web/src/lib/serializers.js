import { Figure } from "./figure"
import Link from "$lib/Link.svelte"

const serializers = {
  types: {
    figure: Figure
  },
  marks: {
    link: Link
  }
};

export default serializers;
