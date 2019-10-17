export function styles(options) {
  const notificationStyles = {}

  if (options.color) {
    notificationStyles.backgroundColor = options.color;
  }

  return notificationStyles
}

export function props(options) {
  const notificationProps = {}

  if (options.timeout) {
    notificationProps.timeout = options.timeout
  }
  return notificationProps
}