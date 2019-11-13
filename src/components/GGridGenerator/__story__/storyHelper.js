import { ref } from '@vue/composition-api'

export function createLayoutObject() {
  // app
  const app = {
    name: 'app',
    hide: false,
    columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
    rows: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
    columnGap: 0,
    rowGap: 0,
    bgColor: 'transparent',
    subAreas: [],
    'align-items': '',
    'align-content': '',
    'justify-items': '',
    'justify-content': ''
  }
  // header
  const header = {
    name: 'header',
    hide: false,
    parent: app,
    columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
    rows: [ref('1fr'), ref('1fr'), ref('1fr')],
    columnGap: 0,
    rowGap: 0,
    area: {
      columnStart: 1,
      columnEnd: 6,
      rowStart: 1,
      rowEnd: 2
    },
    bgColor: 'hsl(68, 100%, 50%, 50%)',
    'align-items': '',
    'align-content': '',
    'justify-items': '',
    'justify-content': '',
    'justify-self': '',
    'align-self': ''
  }
  const headerLogo = {
    name: 'headerLogo',
    hide: false,
    area: {
      columnStart: 2,
      columnEnd: 3,
      rowStart: 2,
      rowEnd: 3
    },
    bgColor: 'hsl(280, 100%, 50%, 50%)',
    'justify-self': '',
    'align-self': '',
    parent: header
  }
  const headerTitle = {
    name: 'headerTitle',
    hide: false,
    area: {
      columnStart: 4,
      columnEnd: 8,
      rowStart: 3,
      rowEnd: 2
    },
    bgColor: 'hsl(262, 100%, 50%, 50%)',
    'justify-self': '',
    'align-self': '',
    parent: header
  }
  header.subAreas = [headerLogo, headerTitle]

  // body
  const body = {
    name: 'body',
    hide: false,
    columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
    rows: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
    columnGap: 0,
    rowGap: 0,
    area: {
      columnEnd: 6,
      columnStart: 1,
      rowEnd: 5,
      rowStart: 2
    },
    bgColor: 'hsl(275, 100%, 50%, 50%)',
    'align-items': '',
    'align-content': '',
    'justify-items': '',
    'justify-content': '',
    'justify-self': '',
    'align-self': '',
    parent: app
  }
  const bodySidebar = {
    name: 'bodySidebar',
    hide: false,
    area: {
      columnEnd: 2,
      columnStart: 1,
      rowEnd: 6,
      rowStart: 1
    },
    bgColor: 'hsl(298, 100%, 50%, 50%)',
    'justify-self': '',
    'align-self': '',
    parent: body
  }
  const bodyContent = {
    name: 'bodyContent',
    hide: false,
    area: {
      columnEnd: 6,
      columnStart: 2,
      rowEnd: 6,
      rowStart: 1
    },
    bgColor: 'hsl(8, 100%, 50%, 50%)',
    'justify-self': '',
    'align-self': '',
    parent: body
  }

  body.subAreas = [bodySidebar, bodyContent]

  // footer
  const footer = {
    name: 'footer',
    hide: false,
    area: {
      columnEnd: 6,
      columnStart: 1,
      rowEnd: 6,
      rowStart: 5
    },
    bgColor: 'hsl(204, 100%, 50%, 50%)',
    'justify-self': '',
    'align-self': '',
    parent: app
  }

  app.subAreas = [header, body, footer]

  return app
}

export function createLayoutStr() {
  return `{
    "name": "app",
    "hide": false,
    "columns": [
        "1fr",
        "1fr",
        "1fr",
        "1fr",
        "1fr"
    ],
    "rows": [
        "1fr",
        "1fr",
        "1fr",
        "1fr",
        "1fr"
    ],
    "columnGap": 0,
    "rowGap": 0,
    "bgColor": "transparent",
    "subAreas": [
        {
            "name": "header",
            "hide": false,
            "columns": [
                "1fr",
                "1fr",
                "1fr",
                "1fr",
                "1fr",
                "1fr",
                "1fr",
                "1fr"
            ],
            "rows": [
                "1fr",
                "1fr",
                "1fr"
            ],
            "columnGap": 0,
            "rowGap": 0,
            "area": {
                "columnStart": 1,
                "columnEnd": 6,
                "rowStart": 1,
                "rowEnd": 2
            },
            "bgColor": "hsl(68, 100%, 50%, 50%)",
            "align-items": "",
            "align-content": "",
            "justify-items": "",
            "justify-content": "",
            "justify-self": "",
            "align-self": "",
            "subAreas": [
                {
                    "name": "headerLogo",
                    "hide": false,
                    "area": {
                        "columnStart": 2,
                        "columnEnd": 3,
                        "rowStart": 2,
                        "rowEnd": 3
                    },
                    "bgColor": "hsl(280, 100%, 50%, 50%)",
                    "justify-self": "",
                    "align-self": ""
                },
                {
                    "name": "headerTitle",
                    "hide": false,
                    "area": {
                        "columnStart": 4,
                        "columnEnd": 8,
                        "rowStart": 3,
                        "rowEnd": 2
                    },
                    "bgColor": "hsl(262, 100%, 50%, 50%)",
                    "justify-self": "",
                    "align-self": ""
                }
            ]
        },
        {
            "name": "body",
            "hide": false,
            "columns": [
                "1fr",
                "1fr",
                "1fr",
                "1fr",
                "1fr"
            ],
            "rows": [
                "1fr",
                "1fr",
                "1fr",
                "1fr",
                "1fr"
            ],
            "columnGap": 0,
            "rowGap": 0,
            "area": {
                "columnEnd": 6,
                "columnStart": 1,
                "rowEnd": 5,
                "rowStart": 2
            },
            "bgColor": "hsl(275, 100%, 50%, 50%)",
            "align-items": "",
            "align-content": "",
            "justify-items": "",
            "justify-content": "",
            "justify-self": "",
            "align-self": "",
            "subAreas": [
                {
                    "name": "bodySidebar",
                    "hide": false,
                    "area": {
                        "columnEnd": 2,
                        "columnStart": 1,
                        "rowEnd": 6,
                        "rowStart": 1
                    },
                    "bgColor": "hsl(298, 100%, 50%, 50%)",
                    "justify-self": "",
                    "align-self": ""
                },
                {
                    "name": "bodyContent",
                    "hide": false,
                    "area": {
                        "columnEnd": 6,
                        "columnStart": 2,
                        "rowEnd": 6,
                        "rowStart": 1
                    },
                    "bgColor": "hsl(8, 100%, 50%, 50%)",
                    "justify-self": "",
                    "align-self": ""
                }
            ]
        },
        {
            "name": "footer",
            "hide": false,
            "area": {
                "columnEnd": 6,
                "columnStart": 1,
                "rowEnd": 6,
                "rowStart": 5
            },
            "bgColor": "hsl(204, 100%, 50%, 50%)",
            "justify-self": "",
            "align-self": ""
        }
    ],
    "align-items": "start",
    "align-content": "end",
    "justify-items": "center",
    "justify-content": "space-around"
}`
}
