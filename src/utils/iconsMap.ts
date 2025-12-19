// Импортируем все SVG-файлы из указанной директории как Astro/JS компоненты.
// import.meta.glob() — собирает все файлы по маске.
// eager: true — импорт происходит сразу при сборке, без динамического запроса.
// import: 'default' — берёт именно default-экспорт (в Astro SVG становится компонентом).
// экспортируем объект iconsMap с именами файлов иконок и соответствующими компонентами

type Icon = (_props: Record<string, any>) => any;

const modules = import.meta.glob('/src/assets/icons/*.svg', {
  eager: true,
  import: 'default'
});

export const iconsMap: Record<string, Icon> = {};

for (const path in modules) {
  const Component = modules[path] as Icon;
  const fileName = path.split('/').pop()!; // clockIcon.svg
  iconsMap[fileName] = Component;
}