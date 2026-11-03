// Launchers that predate the reviews tab ignore ?tab and open the game page
export function launcherGameUrl(slug: string, team: string, tab?: "reviews") {
  const url = `lbk://games/${slug}/${encodeURIComponent(team)}`;
  return tab ? `${url}?tab=${tab}` : url;
}
