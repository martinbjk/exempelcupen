import type { ListItem } from "@/components/CompList";
import { getResults, isDone, shortDate, weekday, type Competition } from "./data";

export function toListItems(comps: Competition[]): ListItem[] {
  return comps.map((c) => ({
    slug: c.slug, ort: c.ort, gren: c.gren, sm: c.sm, farg: c.farg, plats: c.plats,
    short: shortDate(c), weekday: weekday(c), done: isDone(c),
    hasResults: !!getResults(c.slug), open: c.anmalan_oppen && !isDone(c),
  }));
}
