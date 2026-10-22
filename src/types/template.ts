export interface TemplateContext {
    projectName: string;
    author?: string;
    packageManager?: string;

    kebabName?: string;
    camelName?: string;
    pascalName?: string;
    constantName?: string;
}
