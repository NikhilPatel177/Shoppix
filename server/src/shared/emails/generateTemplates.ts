import fs from 'fs';
import path from 'path';

export const generateTemplate = (
  templateName: string,
  variables: Record<string, string>
): string => {
  const filePath = path.join(__dirname, 'templates', `${templateName}.html`);
  let template = fs.readFileSync(filePath, 'utf-8');

  Object.keys(variables).forEach((key) => {
    const placeholder = `{{${key}}}`;
    template = template.replaceAll(placeholder, variables[key]);
  });

  return template;
};
