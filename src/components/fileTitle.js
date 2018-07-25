import { el } from '@internet/dom'

export default function fileTitle (props) {
  var $ = el('div', {
    textContent: props.id,
    css: {
      color: 'white',
      padding: '0 0 10px 0',
      fontSize: '24px',
      fontWeight: '200',
      letterSpacing: '0.021em'
    }
  })

  if (props.subtitle) $.appendChild(props.subtitle)
  return $
}
