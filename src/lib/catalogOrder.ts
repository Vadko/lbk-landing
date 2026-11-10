interface OrderableQuery {
  order(
    column: string,
    options: { ascending: boolean; nullsFirst?: boolean }
  ): this;
}

export const isNameSort = (
  sortBy?: string
): sortBy is "name" | "" | undefined => !sortBy || sortBy === "name";

// A search under the default name sort lists games with a manual translation first, each part by its rating (as the launcher does)
export function orderCatalog<Q extends OrderableQuery>(
  query: Q,
  sortBy?: string,
  search?: string
): Q {
  const ordered =
    search && isNameSort(sortBy)
      ? query
          .order("has_manual", { ascending: false })
          .order("rating", { ascending: false, nullsFirst: false })
      : query.order(sortBy || "name", {
          ascending: isNameSort(sortBy),
          nullsFirst: false,
        });
  return ordered.order("slug", { ascending: true });
}
