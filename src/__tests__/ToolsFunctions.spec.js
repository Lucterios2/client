import { describe, it, expect, vi } from 'vitest'
import { formatToString, formatValue } from '@/libs/utils'
import { messages } from '@/i18n-message.js'
import { useI18n } from 'vue-i18n'

const locale = { value: 'fr' }
vi.mock('vue-i18n')

useI18n.mockReturnValue({
  locale: locale,
  t: (tKey) => {
    return messages[locale.value][tKey]
  }
})

describe('TestFunction', () => {
  it('test_formating_general', () => {
    locale.value = 'fr'

    expect(formatValue(true, 'B')).toEqual('Oui')
    expect(formatValue(false, 'B')).toEqual('Non')

    expect(
      formatToString('Adresses et Contacts', '', '{[center]}{[u]}{[b]}{0}{[/b]}{[/u]}{[/center]}')
    ).toEqual('{[center]}{[u]}{[b]}Adresses et Contacts{[/b]}{[/u]}{[/center]}')

    expect(formatToString(null, null, null)).toEqual('---')
    expect(formatToString('abc', null, null)).toEqual('abc')
    expect(formatToString('abc', null, '{0}')).toEqual('abc')
    expect(formatToString(['abc', 'uvw', 'xyz'], null, null)).toEqual('abc{[br/]}uvw{[br/]}xyz')
    expect(formatToString('abc', null, '{[i]}{[b]}{0}{[/b]}{[/i]}')).toEqual(
      '{[i]}{[b]}abc{[/b]}{[/i]}'
    )
    expect(formatToString(['abc', 'uvw', 'xyz'], null, '{0}: {1} --> {2}')).toEqual(
      'abc: uvw --> xyz'
    )
    expect(formatToString([65.4, 456.04, 894730.124], 'N2', '{0}: {1} --> {2}')).toEqual(
      '65,40: 456,04 --> 894 730,12'
    )
    expect(
      formatToString(
        {
          value: 'abc',
          format: '{[b]}{0}{[/b]}'
        },
        null,
        '{[i]}{0}{[/i]}'
      )
    ).toEqual('{[i]}{[b]}abc{[/b]}{[/i]}')

    expect(formatToString(1234.56, null, '{[i]}{0}{[/i]};{[b]}{0}{[/b]}')).toEqual(
      '{[i]}1234.56{[/i]}'
    )
    expect(formatToString(-1234.56, null, '{[i]}{0}{[/i]};{[b]}{0}{[/b]}')).toEqual(
      '{[b]}1234.56{[/b]}'
    )

    expect(formatToString(0.000001, 'C2EUR', '{0};A')).toEqual('A')
    expect(formatToString(-0.000001, 'C2EUR', '{0};A')).toEqual('A')
    expect(formatToString(-0.000001, 'C2EUR', '{0};A;B')).toEqual('B')
    expect(formatToString(0.000001, 'C2EUR', '{0};A;B')).toEqual('B')

    expect(
      formatToString(
        0,
        {
          0: 'aaa',
          1: 'bbb',
          2: 'ccc'
        },
        '{0}'
      )
    ).toEqual('aaa')
    expect(
      formatToString(
        1,
        {
          0: 'aaa',
          1: 'bbb',
          2: 'ccc'
        },
        '{0}'
      )
    ).toEqual('bbb')
    expect(
      formatToString(
        2,
        {
          0: 'aaa',
          1: 'bbb',
          2: 'ccc'
        },
        '{0}'
      )
    ).toEqual('ccc')
    expect(
      formatToString(
        3,
        {
          0: 'aaa',
          1: 'bbb',
          2: 'ccc'
        },
        '{0}'
      )
    ).toEqual('3')
  })

  it('test_formating_fr', () => {
    locale.value = 'fr'

    expect(formatToString(1234.56, 'N3', '{[i]}{0}{[/i]};{[b]}{0}{[/b]}')).toEqual(
      '{[i]}1 234,560{[/i]}'
    )
    expect(formatToString(-1234.56, 'N3', '{[i]}{0}{[/i]};{[b]}{0}{[/b]}')).toEqual(
      '{[b]}1 234,560{[/b]}'
    )
    expect(formatToString(1234.56, 'N0', '{0}')).toEqual('1 235')

    expect(formatToString(1234.56, 'N3', '{0}')).toEqual('1 234,560')
    expect(formatToString(-1234.56, 'N3', '{0}')).toEqual('-1 234,560')
    expect(formatToString(1234.56, 'C2EUR', '{0}')).toEqual('1 234,56 €')
    expect(formatToString(-1234.56, 'C2EUR', '{0}')).toEqual('-1 234,56 €')

    expect(formatToString(1234.56, 'C2EUR', '{0};')).toEqual('1 234,56 €')
    expect(formatToString(1234.56, 'C2EUR', 'Crédit {0};Débit {0}')).toEqual('Crédit 1 234,56 €')
    expect(
      formatToString(
        1234.56,
        'C2EUR',
        "{[font color='green']}Crédit {0}{[/font]};{[font color='blue']}Débit {0}{[/font]}"
      )
    ).toEqual("{[font color='green']}Crédit 1 234,56 €{[/font]}")
    expect(formatToString(1234.56, 'N2', '{0}')).toEqual('1 234,56')
    expect(formatToString(1234.56, 'C2EUR', '{0};{0}')).toEqual('1 234,56 €')
    expect(formatToString(1234.56, 'C2EUR', '{0}')).toEqual('1 234,56 €')
    expect(
      formatToString(
        1234.56,
        'C2EUR',
        "{[font color='green']}{0}{[/font]};{[font color='blue']}{0}{[/font]}"
      )
    ).toEqual("{[font color='green']}1 234,56 €{[/font]}")

    expect(formatToString(-1234.56, 'C2EUR', '{0};')).toEqual('-1 234,56 €')
    expect(formatToString(-1234.56, 'C2EUR', 'Crédit {0};Débit {0}')).toEqual('Débit 1 234,56 €')
    expect(
      formatToString(
        -1234.56,
        'C2EUR',
        "{[font color='green']}Crédit {0}{[/font]};{[font color='blue']}Débit {0}{[/font]}"
      )
    ).toEqual("{[font color='blue']}Débit 1 234,56 €{[/font]}")
    expect(formatToString(-1234.56, 'N2', '{0}')).toEqual('-1 234,56')
    expect(formatToString(-1234.56, 'C2EUR', '{0};{0}')).toEqual('1 234,56 €')
    expect(formatToString(-1234.56, 'C2EUR', '{0}')).toEqual('-1 234,56 €')
    expect(
      formatToString(
        -1234.56,
        'C2EUR',
        "{[font color='green']}{0}{[/font]};{[font color='blue']}{0}{[/font]}"
      )
    ).toEqual("{[font color='blue']}1 234,56 €{[/font]}")

    expect(formatToString('2017-04-23', 'D', '{0}')).toEqual('23 avril 2017')
    expect(formatToString('12:54:25.014', 'T', '{0}')).toEqual('12:54')
    expect(formatToString('2017-04-23T12:54:25.014', 'H', '{0}').substring(0, 22)).toEqual(
      'dimanche 23 avril 2017'
    )
    var value = formatToString('2017-04-23T12:54:25.014', 'H', '{0}')
    expect(value.substring(value.length - 5)).toEqual('12:54')

    expect(formatToString(true, 'B', '{0}')).toEqual('Oui')
    expect(formatToString(false, 'B', '{0}')).toEqual('Non')
  })

  it('test_formating_en', () => {
    locale.value = 'en'

    expect(formatToString(1234.56, 'N3', '{[i]}{0}{[/i]};{[b]}{0}{[/b]}')).toEqual(
      '{[i]}1,234.560{[/i]}'
    )
    expect(formatToString(-1234.56, 'N3', '{[i]}{0}{[/i]};{[b]}{0}{[/b]}')).toEqual(
      '{[b]}1,234.560{[/b]}'
    )
    expect(formatToString(1234.56, 'N0', '{0}')).toEqual('1,235')

    expect(formatToString(1234.56, 'N3', '{0}')).toEqual('1,234.560')
    expect(formatToString(-1234.56, 'N3', '{0}')).toEqual('-1,234.560')
    expect(formatToString(1234.56, 'C2USD', '{0}')).toEqual('$1,234.56')
    expect(formatToString(-1234.56, 'C2USD', '{0}')).toEqual('-$1,234.56')

    expect(formatToString('2017-04-23', 'D', '{0}')).toEqual('April 23, 2017')
    expect(formatToString('12:54:25.014', 'T', '{0}').split(/\s/)).toEqual(['12:54', 'PM'])
    expect(formatToString('2017-04-23T12:54:25.014', 'H', '{0}').split(/\s/)).toEqual([
      'Sunday,',
      'April',
      '23,',
      '2017',
      'at',
      '12:54',
      'PM'
    ])

    expect(formatToString(true, 'B', '{0}')).toEqual('Yes')
    expect(formatToString(false, 'B', '{0}')).toEqual('No')
  })
})
