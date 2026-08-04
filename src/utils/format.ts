type Params = Record<string, string | number>;

export function formatString(template: string, params: Params): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    String(params[key] ?? ""),
  );
}
