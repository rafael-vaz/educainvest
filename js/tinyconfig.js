// configuracoes do editor de texto
export let tinyConfig = {
  height: 100,
  autoresize_bottom_margin: 0,
  language: "pt_BR",
  menubar: false,
  plugins: "autoresize lists link table",
  default_link_target: "_blank",
  contextmenu: "table | bold italic underline | styles | link | removeformat",
  toolbar:
    "styles | bold italic underline | superscript subscript | bullist numlist | link | table",
  statusbar: false,
  media_poster: false,
  media_alt_source: false,
  media_dimensions: false,
  table_header_type: "sectionCells",
  content_css:
    "https://firebasestorage.googleapis.com/v0/b/uniasselvi-digital.appspot.com/o/temas-livro%2Futilitarios%2Fcss%2Ftiny_clean.css?alt=media&token=b16ce0f3-9a96-45a3-9c62-29678727bb24&_gl=1*e5dcmq*_ga*MTQxODY1NTY0MC4xNjk3NjQ5MjIy*_ga_CW55HF8NVT*MTY5ODI2MzUwMi4yLjEuMTY5ODI2NDU1Ni41NC4wLjA.",
  style_formats: [
    {
      title: "Headings",
      items: [
        { title: "Grande", block: "h1" },
        { title: "Médio", block: "h2" },
        { title: "Pequeno", block: "h3" },
      ],
    },
    {
      title: "Align",
      items: [
        { title: "Left", format: "alignleft" },
        { title: "Center", format: "aligncenter" },
        { title: "Right", format: "alignright" },
      ],
    },
  ],
  visualblocks_default_state: true,
  end_container_on_empty_block: true,
  paste_preprocess: function (plugin, args) {
    args.content = "";
  },
};
