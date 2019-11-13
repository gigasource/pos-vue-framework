import { ref } from '@vue/composition-api'

export function createLayoutObject() {
  // app
  const app = {
    name: 'app',
    hide: false,
    settings: {
      columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
      rows: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
      columnGap: 0,
      rowGap: 0,
    },
    bgColor: 'transparent',
    subAreas: []
  }
  // header
  const header = {
    name: 'header',
    hide: false,
    parent: app,
    settings: {
      columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
      rows: [ref('1fr'), ref('1fr'), ref('1fr')],
      columnGap: 0,
      rowGap: 0,
    },
    area: {
      columnStart: 1,
      columnEnd: 6,
      rowStart: 1,
      rowEnd: 2
    },
    bgColor: 'hsl(68, 100%, 50%, 50%)',
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
    parent: header
  }
  header.subAreas = [headerLogo, headerTitle]

  // body
  const body = {
    name: 'body',
    hide: false,
    settings: {
      columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
      rows: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
      columnGap: 0,
      rowGap: 0,
    },
    area: {
      columnEnd: 6,
      columnStart: 1,
      rowEnd: 5,
      rowStart: 2
    },
    bgColor: 'hsl(275, 100%, 50%, 50%)',
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
    parent: app
  }

  app.subAreas = [header, body, footer]

  return app
}
