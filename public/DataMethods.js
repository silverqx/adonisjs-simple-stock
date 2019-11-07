/**
 * Allows to define request method on <a> tag.
 *
 * Generates <form> with proper csrf and method on a link click.
 */
const DataMethods = () => {
  $('a[data-method], button[data-method]').on('click', (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    const data = {}
    const $link = $(ev.currentTarget)

    for (let i = 0; i <= $link[0].attributes.length - 1; i++) {
      let attribute = $link[0].attributes[i]

      if (typeof attribute.name != 'string') {
        continue
      }

      let found = attribute.name.match(/data-values-(.+)/i)

      if (!found) {
        continue
      }

      data[found[1]] = attribute.value
    }

    const action = $link.attr('href') || $link.data('href')
    const method = $link.data('method')
    // let csrfToken = window.Laravel.csrfToken
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content

    const $form = $(`<form method="post" action="${action}?_method=${method}"></form>`)

    $form.append(`<input type="hidden" name="_csrf" value="${csrfToken}">`)

    Object.keys(data).forEach((key) => {
      $form.append(`<input type="hidden" name="${key}" value="${data[key]}">`)
    })

    $('body').append($form)

    $form.submit()
  })
}

$(document).ready(DataMethods)
