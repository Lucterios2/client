export function convert_event_to_object(value) {
  if (Array.isArray(value)) {
    const new_array = Array()
    value.forEach((element) => {
      new_array.push(convert_event_to_object(element))
    })
    return new_array
  } else if (typeof value === 'object') {
    const new_object = {}
    for (var key in value) {
      /* eslint no-prototype-builtins: 0 */
      if (value.hasOwnProperty(key) && key !== '_vts' && key !== 'isTrusted') {
        new_object[key] = value[key]
      }
    }
    return new_object
  } else {
    return value
  }
}

export const example_server_data = {
  title: 'Diacamma',
  sub_title: 'Nouveau client',
  applis_version: '2.6.13.23102415',
  server_version: '2.6.13.23102415',
  copy_rigth: '(c) GPL Licence',
  version_current: '2.6.13.23102415',
  version_expected: '2.6.13.23102415',
  info_server: [
    'Cœur Lucterios=2.6.13.23102409',
    'Contacts Lucterios=2.6.9.23082509',
    'Documents Lucterios =2.6.6.23072015',
    'Courrier Lucterios=2.6.6.23082509',
    '',
    "<i>Linux x86_64 4.19.0-24-cloud-amd64 - Python 3.10.11 - Django 3.2.20 - langage 'fr'</i>"
  ],
  support_email: 'support@diacamma.org',
  support_html:
    "<table style='text-align: center; width: 100%;'><tr><td><img width='128px' title='Diacamma' alt='Diacamma' src='https://forum.diacamma.org/static/DiacammaForum.png?asso=2.6.13.23102415'/></td></td><tr><td>Retrouvez la communauté <i>Diacamma</i> sur notre forum et notre blog</td></td><tr><td><a href='https://www.diacamma.org' target='_blank'>https://www.diacamma.org</a></td></td></table>",
  logo_iconname:
    'data:image/png;base64,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',
  background: '',
  style: 'body {background: #F7DE94;}',
  login: 'admin',
  real_name: '',
  instance_name: 'truc-muche',
  message_before: `{[u]}{[b]}Bienvenue sur le test du nouveau graphisme de Diacamma.{[/b]}{[/u]}{[br]}
- Les données présentées sont statiques, sans serveur.{[br]}
- Pour vous connecter, saisissez le même alias et mot de passe.{[br]}
- Les icons utilisées se trouvent ici : {[a href='https://materialdesignicons.com']}https://materialdesignicons.com{[/a]}{[br]}
- N'hésitez pas à faire vos remarques sur l'erognomie : {[a href='mailto:support@diacamma.org']}support@diacamma.org{[/a]}.{[br]}
{[i]}Merci de votre soutien à Diacamma{[/i]}
`,
  mode: 1,
  login_field: 'username',
  language: 'fr',
  only_admin: false
}

export const example_logon_actions = [
  {
    text: 'Mot de passe oublié?',
    id: 'CORE/askPassword',
    short_icon: 'mdi:mdi-key',
    extension: 'CORE',
    action: 'askPassword',
    modal: '1',
    close: '0',
    unique: '1',
    method: 'POST',
    params: null
  },
  {
    text: 'Créer un compte',
    id: 'lucterios.contacts/createAccount',
    short_icon: 'mdi:mdi-account-plus',
    extension: 'lucterios.contacts',
    action: 'createAccount',
    modal: '1',
    close: '0',
    unique: '1',
    method: 'POST',
    params: null
  }
]

export const example_menu_data = [
  {
    text: '',
    id: 'core.menu',
    menus: [
      {
        text: 'Résumé 1',
        id: 'CORE/statusMenu1',
        icon: '/static/lucterios.CORE/images/status.png',
        short_icon: '',
        extension: 'CORE',
        action: 'statusMenu',
        help: 'Résumé',
        modal: '1',
        close: '1',
        unique: '1',
        method: 'GET',
        params: null
      },
      {
        text: 'Résumé 2',
        id: 'CORE/statusMenu2',
        icon: '/static/lucterios.CORE/images/status.png',
        short_icon: 'mdi:mdi-information',
        extension: 'CORE',
        action: 'statusMenu2',
        help: 'Résumé',
        modal: '1',
        close: '1',
        unique: '1',
        method: 'GET',
        params: null
      }
    ]
  },
  {
    text: 'Général',
    id: 'core.general',
    icon: '',
    short_icon: 'mdi:mdi-home',
    help: "Ensemble d'actions génériques liées à l'utilisateur connecté.",
    menus: [
      {
        text: 'Votre compte',
        id: 'lucterios.contacts/account',
        icon: '',
        short_icon: 'mdi:mdi-account',
        extension: 'lucterios.contacts',
        action: 'account',
        help: 'Visualiser la fiche de votre compte.',
        modal: '0',
        close: '1',
        unique: '1',
        method: 'GET',
        params: null
      },
      {
        text: 'Les responsables',
        id: 'lucterios.contacts/accountList',
        icon: '',
        short_icon: 'mdi:mdi-human-queue',
        extension: 'lucterios.contacts',
        action: 'accountList',
        help: 'Visualiser la liste des comptes.',
        modal: '1 ',
        close: '1',
        unique: '1',
        method: 'GET',
        params: null
      },
      {
        text: 'Test of composants',
        id: 'lucterios.dummy/testComposants',
        icon: '',
        short_icon: 'mdi:mdi-video-input-component',
        extension: 'lucterios.dummy',
        action: 'testComposants',
        help: 'Test of composants.',
        modal: '1 ',
        close: '1',
        unique: '1',
        method: 'GET',
        params: null
      }
    ]
  },
  {
    text: 'Dialogue',
    id: 'dialog',
    icon: '',
    short_icon: 'mdi:mdi-white-balance-sunny',
    help: "Ensemble d'actions d'exemple de boite de dialogue",
    menus: [
      {
        text: 'Sous-exemple 1',
        id: 'dialog.sub1',
        icon: '',
        short_icon: 'mdi:mdi-cat',
        help: "Premier sous ensemble d'actions",
        menus: [
          {
            text: 'Action 1a',
            id: 'dialog.sub1/action1',
            icon: '',
            short_icon: 'mdi:mdi-owl',
            extension: 'dialog.sub1',
            action: 'action1',
            help: 'première action',
            modal: '0',
            close: '1',
            unique: '1',
            method: 'GET',
            params: null
          },
          {
            text: 'Action 1b',
            id: 'dialog.sub1/action2',
            icon: '',
            short_icon: 'mdi:mdi-tortoise',
            extension: 'dialog.sub1',
            action: 'action2',
            help: 'deuxieme action',
            modal: '0',
            close: '1',
            unique: '1',
            method: 'GET',
            params: null
          },
          {
            text: 'Action 1c',
            id: 'dialog.sub1/action3',
            icon: '',
            short_icon: 'mdi:mdi-bee',
            extension: 'dialog.sub1',
            action: 'action3',
            help: 'troisième action',
            modal: '0',
            close: '1',
            unique: '1',
            method: 'GET',
            params: null
          },
          {
            text: 'Action 1d',
            id: 'dialog.sub1/action4',
            icon: '',
            short_icon: 'mdi:mdi-dog',
            extension: 'dialog.sub1',
            action: 'action4',
            help: 'quatrième action',
            modal: '0',
            close: '1',
            unique: '1',
            method: 'GET',
            params: null
          }
        ]
      },
      {
        text: 'Sous-exemple 2',
        id: 'dialog.sub2',
        icon: '',
        short_icon: 'mdi:mdi-cash',
        help: "Deuxième sous ensemble d'action",
        menus: [
          {
            text: 'Action 2a',
            id: 'dialog.sub2/action1',
            icon: '',
            short_icon: 'mdi:mdi-currency-eur',
            extension: 'dialog.sub2',
            action: 'action1',
            help: 'première action',
            modal: '0',
            close: '1',
            unique: '1',
            method: 'GET',
            params: null
          },
          {
            text: 'Action 1b',
            id: 'dialog.sub2/action2',
            icon: '',
            short_icon: 'mdi:mdi-currency-gbp',
            extension: 'dialog.sub2',
            action: 'action2',
            help: 'deuxième action',
            modal: '0',
            close: '1',
            unique: '1',
            method: 'GET',
            params: null
          }
        ]
      },
      {
        text: 'Sous-exemple 3',
        id: 'dialog.sub3',
        icon: '',
        short_icon: 'mdi:mdi-baguette',
        help: "Troisième sous ensemble d'action",
        menus: [
          {
            text: 'Action 3a',
            id: 'dialog.sub3/action1',
            icon: '',
            short_icon: 'mdi:mdi-coffee',
            extension: 'dialog.sub3',
            action: 'action1',
            help: 'première action',
            modal: '0',
            close: '1',
            unique: '1',
            method: 'GET',
            params: null
          }
        ]
      }
    ]
  },
  {
    text: 'Impression',
    id: 'print',
    icon: '',
    short_icon: 'mdi:mdi-printer',
    help: "Ensemble d'actions d'impression",
    menus: [
      {
        text: 'Action 1a',
        id: 'print/action1',
        icon: '',
        short_icon: 'mdi:mdi-printer-pos-play-outline',
        extension: 'print',
        action: 'action1',
        help: 'première action',
        modal: '0',
        close: '1',
        unique: '1',
        method: 'GET',
        params: null
      }
    ]
  },
  {
    text: 'Acknoledge',
    id: 'ack',
    icon: '',
    short_icon: 'mdi:mdi-palette-outline',
    help: "Ensemble d'accusé de reception",
    menus: [
      {
        text: 'Acknoledge 1',
        id: 'ack/action1',
        icon: '',
        short_icon: 'mdi:mdi-format-paint',
        extension: 'ack',
        action: 'action1',
        help: 'ack',
        modal: '0',
        close: '1',
        unique: '1',
        method: 'GET',
        params: null
      },
      {
        text: 'Acknoledge 2',
        id: 'ack/action2',
        icon: '',
        short_icon: 'mdi:mdi-invert-colors',
        extension: 'ack',
        action: 'action1',
        help: 'ack',
        modal: '0',
        close: '1',
        unique: '1',
        method: 'GET',
        params: null
      },
      {
        text: 'Acknoledge 3',
        id: 'ack/action3',
        icon: '',
        short_icon: 'mdi:mdi-format-color-highlight',
        extension: 'ack',
        action: 'action3',
        help: 'ack',
        modal: '0',
        close: '1',
        unique: '1',
        method: 'GET',
        params: null
      }
    ]
  },
  {
    text: 'Erreurs',
    id: 'error',
    icon: '',
    short_icon: 'mdi:mdi-cloud',
    help: "Ensemble d'actions d'exemple d'erreurs",
    menus: [
      {
        text: 'Erreur 1',
        id: 'erreur/action1',
        icon: '',
        short_icon: 'mdi:mdi-clouds',
        extension: 'erreur',
        action: 'action1',
        help: 'erreur',
        modal: '0',
        close: '1',
        unique: '1',
        method: 'GET',
        params: null
      },
      {
        text: 'Sous-erreur',
        id: 'erreur.sub1',
        icon: '',
        short_icon: 'mdi:mdi-cloud-refresh-outline',
        help: "Sous ensemble d'erreurs",
        menus: [
          {
            text: 'Erreur 2a',
            id: 'erreur.sub/action1',
            icon: '',
            short_icon: 'mdi:mdi-clouds',
            extension: 'erreur',
            action: 'action1',
            help: 'erreur',
            modal: '0',
            close: '1',
            unique: '1',
            method: 'GET',
            params: null
          },
          {
            text: 'Erreur 2b',
            id: 'erreur.sub/action2',
            icon: '',
            short_icon: 'mdi:mdi-cloud-refresh-variant-outline',
            extension: 'erreur',
            action: 'action2',
            help: 'erreur',
            modal: '0',
            close: '1',
            unique: '1',
            method: 'GET',
            params: null
          },
          {
            text: 'Erreur 2c',
            id: 'erreur.sub/action3',
            icon: '',
            short_icon: 'mdi:mdi-cloud-upload',
            extension: 'erreur.sub',
            action: 'action3',
            help: 'erreur',
            modal: '0',
            close: '1',
            unique: '1',
            method: 'GET',
            params: null
          },
          {
            text: 'Erreur 2d',
            id: 'erreur.sub/action4',
            icon: '',
            short_icon: 'mdi:mdi-cloud-off-outline',
            extension: 'erreur.sub',
            action: 'action4',
            help: 'erreur',
            modal: '0',
            close: '1',
            unique: '1',
            method: 'GET',
            params: null
          }
        ]
      }
    ]
  }
]

export const response_to_ident = {
  'CORE/askPassword': {
    context: {},
    data: {
      message: 'Mot de passe ou alias oublié?',
      type: 1
    },
    meta: {
      extension: 'CORE',
      title: 'Mot de passe ou alias oublié?',
      action: 'askPassword',
      observer: 'core.dialogbox'
    },
    actions: [],
    close: null
  },
  'lucterios.contacts/createAccount': {
    context: {},
    data: {
      message: 'Créer un compte',
      type: 2
    },
    meta: {
      extension: 'CORE',
      title: 'Créer un compte',
      action: 'createAccount',
      observer: 'core.dialogbox'
    },
    actions: [],
    close: null
  },
  'CORE/statusMenu1': {
    context: {},
    comp: [
      {
        name: 'contactstitle',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 0,
        colspan: 4,
        rowspan: 1,
        needed: false,
        formatstr: '{[center]}{[u]}{[b]}%s{[/b]}{[/u]}{[/center]}',
        formatnum: null
      },
      {
        name: 'lbl_nblegalentities',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 1,
        colspan: 4,
        rowspan: 1,
        needed: false,
        formatstr: '{[center]}%s{[/center]}',
        formatnum: null
      },
      {
        name: 'lbl_nbindividuals',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 2,
        colspan: 4,
        rowspan: 1,
        needed: false,
        formatstr: '{[center]}%s{[/center]}',
        formatnum: null
      },
      {
        name: 'contactsend',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 3,
        colspan: 4,
        rowspan: 1,
        needed: false,
        formatstr: '{[center]}%s{[/center]}',
        formatnum: null
      }
    ],
    data: {
      contactstitle: 'Adresses et Contacts',
      lbl_nblegalentities: 'Nombre total de structures morales : 8',
      lbl_nbindividuals: 'Nombre total de contacts physiques : 81',
      contactsend: '{[hr/]}'
    },
    meta: {
      extension: 'CORE',
      title: 'Menu 1',
      action: 'statusMenu1',
      observer: 'core.custom'
    },
    actions: [],
    close: null
  },
  'CORE/statusMenu2': {
    context: {},
    data: {
      documentend: '{[hr/]}',
      accountingtitle: 'Gestion comptable',
      accounting_year: 'Exercice du 1 septembre 2017 au 31 août 2018 [en cours]',
      accounting_result: [423, 934.6, -511.6, 1368.4, 1335.4],
      accountingend: '{[hr/]}'
    },
    comp: [
      {
        name: 'accountingtitle',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 7,
        colspan: 4,
        rowspan: 1,
        needed: false,
        formatstr: '{[center]}{[u]}{[b]}%s{[/b]}{[/u]}{[/center]}',
        formatnum: null
      },
      {
        name: 'accounting_year',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 8,
        colspan: 4,
        rowspan: 1,
        needed: false,
        formatstr: '{[center]}%s{[/center]}',
        formatnum: null
      },
      {
        name: 'accounting_result',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 9,
        colspan: 4,
        rowspan: 1,
        needed: false,
        formatstr:
          '{[center]}{[b]}Produits :{[/b]} {0} - {[b]}Charges :{[/b]} {1} = {[b]}Résultat :{[/b]} {2}{[br/]}{[b]}Trésorerie :{[/b]} {3} - {[b]}dont écritures validées :{[/b]} {4}{[/center]}',
        formatnum: 'C2EUR'
      },
      {
        name: 'accountingend',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 10,
        colspan: 4,
        rowspan: 1,
        needed: false,
        formatstr: '{[center]}%s{[/center]}',
        formatnum: null
      }
    ],
    meta: {
      extension: 'CORE',
      title: 'Menu 2',
      action: 'statusMenu2',
      observer: 'core.custom'
    },
    actions: [],
    close: null
  },
  'lucterios.contacts/account': {
    context: {},
    data: {
      img: 'mdi:mdi-account',
      title: 'Votre fiche',
      __tab_1: 'Identité',
      logoimg:
        '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',
      firstname: 'Jean',
      lastname: 'Valjean',
      address: 'place de la liberté',
      postal_code: '99000',
      city: 'TRIFOUILLY',
      country: '',
      tel1: '0912457832',
      tel2: '0732659845',
      email: 'jean.valjean@zmail.net',
      comment:
        'Un mec super top.{[br]}Toujours près pour aider.{[br]}Il aurait bien aider la petite Cosette.',
      __tab_2: 'Vide'
    },
    comp: [
      {
        name: 'img',
        component: 'IMAGE',
        description: '',
        tab: 0,
        x: 0,
        y: 0,
        colspan: 1,
        rowspan: 2,
        needed: false,
        type: '#'
      },
      {
        name: 'title',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 1,
        y: 0,
        colspan: 4,
        rowspan: 1,
        needed: false,
        formatstr: '{[br/]}{[center]}{[u]}{[b]}%s{[/b]}{[/u]}{[/center]}',
        formatnum: null
      },
      {
        name: '__tab_1',
        component: 'TAB',
        description: '',
        tab: 1,
        x: 0,
        y: -1,
        colspan: 1,
        rowspan: 1,
        needed: false
      },
      {
        name: 'logoimg',
        component: 'IMAGE',
        description: '',
        tab: 1,
        x: 0,
        y: 1,
        colspan: 1,
        rowspan: 6,
        needed: false,
        type: 'jpg'
      },
      {
        name: 'firstname',
        component: 'LABELFORM',
        description: 'prénom',
        tab: 1,
        x: 1,
        y: 1,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'lastname',
        component: 'LABELFORM',
        description: 'nom',
        tab: 1,
        x: 2,
        y: 1,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'address',
        component: 'LABELFORM',
        description: 'adresse',
        tab: 1,
        x: 1,
        y: 2,
        colspan: 2,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'postal_code',
        component: 'LABELFORM',
        description: 'code postal',
        tab: 1,
        x: 1,
        y: 3,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'city',
        component: 'LABELFORM',
        description: 'ville',
        tab: 1,
        x: 2,
        y: 3,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'country',
        component: 'LABELFORM',
        description: 'pays',
        tab: 1,
        x: 1,
        y: 4,
        colspan: 2,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'tel1',
        component: 'LABELFORM',
        description: 'tel1',
        tab: 1,
        x: 1,
        y: 5,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'tel2',
        component: 'LABELFORM',
        description: 'tel2',
        tab: 1,
        x: 2,
        y: 5,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'email',
        component: 'LINK',
        description: 'courriel',
        tab: 1,
        x: 1,
        y: 6,
        colspan: 2,
        rowspan: 1,
        needed: false,
        link: 'mailto:olympiens@gmail.com'
      },
      {
        name: 'comment',
        component: 'LABELFORM',
        description: 'commentaire',
        tab: 1,
        x: 1,
        y: 7,
        colspan: 2,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: '__tab_2',
        component: 'TAB',
        description: '',
        tab: 2,
        x: 0,
        y: -1,
        colspan: 1,
        rowspan: 1,
        needed: false
      }
    ],
    meta: {
      extension: 'lucterios.contacts',
      action: 'account',
      title: 'Votre compte',
      observer: 'core.custom'
    },
    actions: [],
    close: null
  },
  'lucterios.contacts/accountList': {
    context: {},
    data: {
      img: 'mdi:mdi-human-queue',
      responsability: [
        {
          id: 1,
          individual: 'ARULATEDA Paul',
          functions: ['président'],
          __color_ref__: null
        },
        {
          id: 2,
          individual: 'DEZACA Jacques',
          functions: ['secrétaire'],
          __color_ref__: null
        },
        {
          id: 3,
          individual: 'EWONATO Elodie',
          functions: ['trésorier'],
          __color_ref__: null
        },
        {
          id: 5,
          individual: 'HEKENU Ines',
          functions: ['chargé de mission'],
          __color_ref__: null
        }
      ]
    },
    comp: [
      {
        name: 'img',
        component: 'IMAGE',
        description: '',
        tab: 0,
        x: 0,
        y: 0,
        colspan: 1,
        rowspan: 1,
        needed: false,
        type: '#'
      },
      {
        name: 'responsability',
        component: 'GRID',
        description: 'associé',
        tab: 0,
        x: 1,
        y: 0,
        colspan: 1,
        rowspan: 1,
        needed: false,
        page_max: 3,
        page_num: 1,
        order: null,
        headers: [
          ['individual', 'personne physique', null, 1, '%s'],
          ['functions', 'fonctions', null, 1, '%s']
        ],
        actions: [
          {
            text: 'Editer',
            id: 'dialog.sub1/action1',
            icon: '',
            short_icon: 'mdi:mdi-note-check-outline',
            extension: 'example.sub1',
            action: 'action1',
            modal: '1',
            close: '0',
            unique: '0',
            method: 'GET',
            params: null
          },
          {
            text: 'Modifier',
            id: 'dialog.sub1/action2',
            icon: '',
            short_icon: 'mdi:mdi-note-edit-outline',
            extension: 'example.sub1',
            action: 'action4',
            modal: '1',
            close: '0',
            unique: '0',
            method: 'POST',
            params: null
          },
          {
            text: 'Supprimer',
            id: 'dialog.sub1/action3',
            icon: '',
            short_icon: 'mdi:mdi-note-minus-outline',
            extension: 'example.sub1',
            action: 'action4',
            modal: '1',
            close: '0',
            unique: '2',
            method: 'DELETE',
            params: null
          },
          {
            text: 'Ajouter',
            id: 'dialog.sub1/action4',
            icon: '',
            short_icon: 'mdi:mdi-note-plus-outline',
            extension: 'example.sub1',
            action: 'action4',
            modal: '1',
            close: '0',
            unique: '1',
            method: 'POST',
            params: null
          }
        ],
        size_by_page: 25,
        nb_lines: 80,
        no_pager: false
      }
    ],
    meta: {
      extension: 'lucterios.contacts',
      action: 'accountList',
      title: 'Les responsables',
      observer: 'core.custom'
    },
    actions: [],
    close: null
  },
  'lucterios.dummy/testComposants': {
    data: {
      Lbl2: 'editor=aaa',
      edt1: 'aaa',
      Lbl3: 'Real=3.1399999',
      flt1: 3.1399999,
      Lbl4: 'Memo=xyz',
      mm1: 'xyz',
      Lbl5: 'Date=2007-04-23',
      dt1: '2007-04-23',
      Lbl6: 'Hour=12:34:00',
      tm1: '12:34:00',
      Lbl7: 'Date Hour=2008-07-12 23:47:31',
      stm1: '2008-07-12 23:47:31',
      Lbl8: 'Coche=False',
      ck1: 0,
      Lbl9: 'Select=1',
      slct1: '2',
      Lbl10: 'Integer=5',
      flt2: 5,
      Lbl11: "CheckList=['1', '2']",
      cl1: ['1', '2'],
      Lbl12: "CheckList 2=['b', 'd', 'f']",
      cl2: ['b', 'd', 'f'],
      Lbl13: 'Bouton',
      btn1: '',
      Lbl14: 'password',
      pass1: '',
      Lbl15: 'captcha',
      captcha: ''
    },
    comp: [
      {
        name: 'Lbl2',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 1,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'edt1',
        component: 'EDIT',
        description: 'editor',
        tab: 0,
        x: 1,
        y: 1,
        colspan: 1,
        rowspan: 1,
        needed: true,
        is_mini: false,
        is_default: false,
        java_script: '',
        __action: {
          text: 'Modify',
          id: 'lucterios.dummy/testComposants',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'edt1'
        },
        size: 10,
        reg_expr: '^[a-z]*$'
      },
      {
        name: 'Lbl3',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 2,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'flt1',
        component: 'FLOAT',
        description: 'real    ',
        tab: 0,
        x: 1,
        y: 2,
        colspan: 1,
        rowspan: 1,
        needed: true,
        is_mini: false,
        is_default: false,
        java_script: '',
        action: {
          text: 'Modify',
          id: 'lucterios.dummy/testComposants',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'flt1'
        },
        min: 0.0,
        max: 10000.0,
        prec: 2
      },
      {
        name: 'Lbl4',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 3,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'mm1',
        component: 'MEMO',
        description: 'memo',
        tab: 0,
        x: 1,
        y: 3,
        colspan: 1,
        rowspan: 1,
        VMin: 50,
        HMin: 200,
        needed: false,
        is_mini: false,
        is_default: false,
        java_script: '',
        action: {
          text: 'Modify',
          id: 'lucterios.dummy/testComposants',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'mm1'
        },
        submenu: [
          ['Premi\u00e8re valeur', 'VALUE_1'],
          ['Deuxi\u00e8me valeur', 'VALUE_2'],
          ['Troisi\u00e8me valeur', 'VALUE_3']
        ],
        with_hypertext: true
      },
      {
        name: 'Lbl5',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 4,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'dt1',
        component: 'DATE',
        description: 'date',
        tab: 0,
        x: 1,
        y: 4,
        colspan: 1,
        rowspan: 1,
        needed: false,
        is_mini: false,
        is_default: false,
        java_script: '',
        action: {
          text: 'Modify',
          id: 'dt1',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'dt1'
        }
      },
      {
        name: 'Lbl6',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 5,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'tm1',
        component: 'TIME',
        description: 'time',
        tab: 0,
        x: 1,
        y: 5,
        colspan: 1,
        rowspan: 1,
        needed: false,
        is_mini: false,
        is_default: false,
        java_script: '',
        action: {
          text: 'Modify',
          id: 'tm1',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'tm1'
        }
      },
      {
        name: 'Lbl7',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 6,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'stm1',
        component: 'DATETIME',
        description: 'date & time',
        tab: 0,
        x: 1,
        y: 6,
        colspan: 1,
        rowspan: 1,
        needed: false,
        is_mini: false,
        is_default: false,
        java_script: '',
        action: {
          text: 'Modify',
          id: 'stm1',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'stm1'
        }
      },
      {
        name: 'Lbl8',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 7,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'ck1',
        component: 'CHECK',
        description: 'coche',
        tab: 0,
        x: 1,
        y: 7,
        colspan: 1,
        rowspan: 1,
        needed: false,
        is_mini: false,
        is_default: false,
        java_script: ''
        /*action: {
          text: 'Modify',
          id: 'ck1',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'ck1'
        }*/
      },
      {
        name: 'Lbl9',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 8,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'slct1',
        component: 'SELECT',
        description: 'select',
        tab: 0,
        x: 1,
        y: 8,
        colspan: 1,
        rowspan: 1,
        needed: false,
        is_mini: false,
        is_default: false,
        java_script: '',
        action: {
          text: 'Modify',
          id: 'slct1',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'slct1'
        },
        case: [
          ['1', 'abc'],
          ['2', 'def'],
          ['3', 'ghij']
        ]
      },
      {
        name: 'Lbl10',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 9,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'flt2',
        component: 'FLOAT',
        description: 'int',
        tab: 0,
        x: 1,
        y: 9,
        colspan: 1,
        rowspan: 1,
        needed: true,
        is_mini: false,
        is_default: false,
        java_script: '',
        action: {
          text: 'Modify',
          id: 'flt2',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'flt2'
        },
        min: -100.0,
        max: 100.0,
        prec: 0
      },
      {
        name: 'Lbl11',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 10,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'cl1',
        component: 'CHECKLIST',
        description: '',
        tab: 0,
        x: 1,
        y: 10,
        colspan: 1,
        rowspan: 1,
        needed: false,
        is_mini: false,
        is_default: false,
        java_script: '',
        action: {
          text: 'Modify',
          id: 'cl1',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'cl1'
        },
        case: [
          ['1', 'abc'],
          ['2', 'def'],
          ['3', 'ghij'],
          ['4', 'klmn']
        ],
        simple: '0'
      },
      {
        name: 'Lbl12',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 11,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'cl2',
        component: 'CHECKLIST',
        description: '',
        tab: 0,
        x: 1,
        y: 11,
        colspan: 1,
        rowspan: 1,
        needed: false,
        is_mini: false,
        is_default: false,
        java_script: '',
        action: {
          text: 'Modify',
          id: 'cl2',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'cl2'
        },
        case: [
          ['a', '123'],
          ['b', '456'],
          ['c', '789'],
          ['d', '147'],
          ['e', '258'],
          ['f', '369']
        ],
        simple: '2'
      },
      {
        name: 'Lbl13',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 20,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'btn1',
        component: 'BUTTON',
        description: '',
        tab: 0,
        x: 1,
        y: 20,
        colspan: 1,
        rowspan: 1,
        needed: false,
        is_mini: true,
        is_default: true,
        java_script: '',
        action: {
          text: 'Modify',
          id: 'lucterios.dummy/testComposants',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          short_icon: 'mdi:mdi-check',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'btn1'
        }
      },
      {
        name: 'Lbl14',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 21,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'pass1',
        component: 'PASSWD',
        description: 'password',
        tab: 0,
        x: 1,
        y: 21,
        colspan: 1,
        rowspan: 1,
        needed: false,
        java_script: ''
        /*action: {
          text: 'Modify',
          id: 'lucterios.dummy/testComposants',
          extension: 'lucterios.dummy',
          action: 'testComposants',
          short_icon: 'mdi:mdi-check',
          modal: '2',
          close: '0',
          unique: '1',
          method: 'POST',
          params: null,
          name: 'btn1'
        }*/
      },
      {
        name: 'Lbl15',
        component: 'LABELFORM',
        description: '',
        tab: 0,
        x: 0,
        y: 22,
        colspan: 1,
        rowspan: 1,
        needed: false,
        formatstr: '%s',
        formatnum: null
      },
      {
        name: 'captcha',
        component: 'CAPTCHA',
        description: 'captcha',
        tab: 0,
        x: 1,
        y: 22,
        colspan: 1,
        rowspan: 1,
        needed: false
      }
    ],
    actions: [
      ...example_logon_actions,
      ...[
        {
          text: 'Fin',
          id: '',
          icon: '/static/lucterios.CORE/images/close.png',
          modal: '1',
          close: '1',
          unique: '1',
          method: 'POST',
          params: null
        }
      ]
    ],
    meta: {
      observer: 'core.custom',
      extension: 'lucterios.dummy',
      action: 'testComposants',
      title: 'Test of composants'
    },
    context: {},
    close: null
  },
  'dialog.sub1/action1': {
    context: {},
    data: {
      message: 'Action 1a',
      type: 1
    },
    meta: {
      extension: 'example.sub1',
      action: 'action1',
      title: 'Action 1a',
      observer: 'core.dialogbox'
    },
    actions: [],
    close: null
  },
  'dialog.sub1/action2': {
    context: {},
    data: {
      message: 'Action 1b',
      type: 2
    },
    meta: {
      extension: 'example.sub1',
      action: 'action2',
      title: 'Action 1b',
      observer: 'core.dialogbox'
    },
    actions: [],
    close: null
  },
  'dialog.sub1/action3': {
    context: {},
    data: {
      message: 'Action 1c',
      type: 3
    },
    meta: {
      extension: 'example.sub1',
      action: 'action1',
      title: 'Action 1c',
      observer: 'core.dialogbox'
    },
    actions: [],
    close: null
  },
  'dialog.sub1/action4': {
    context: {},
    data: {
      message: 'Action 1d',
      type: 4
    },
    meta: {
      extension: 'example.sub1',
      action: 'action4',
      title: 'Action 1d',
      observer: 'core.dialogbox'
    },
    actions: [],
    close: null
  },
  'dialog.sub2/action1': {
    context: {},
    data: {
      message: 'Action 21a',
      type: 2
    },
    meta: {
      extension: 'example.sub2',
      action: 'action1',
      title: 'Action 2a',
      observer: 'core.dialogbox'
    },
    actions: [
      ...example_logon_actions,
      ...[{ text: 'Fermer', id: '', short_icon: 'mdi:mdi-close', close: '1' }]
    ],
    close: null
  },
  'dialog.sub2/action2': {
    context: {},
    data: {
      message: 'Action 1b',
      type: 3
    },
    meta: {
      extension: 'example.sub2',
      action: 'action2',
      title: 'Action 2b',
      observer: 'core.dialogbox'
    },
    actions: [
      ...example_logon_actions,
      ...[{ text: 'Fermer', id: '', short_icon: 'mdi:mdi-close', close: '1' }]
    ],
    close: null
  },
  'dialog.sub3/action1': {
    context: {},
    data: {
      message: 'Action 3a',
      type: 2
    },
    meta: {
      extension: 'example.sub3',
      action: 'action1',
      title: 'Action 3a',
      observer: 'core.dialogbox'
    },
    actions: [],
    close: example_logon_actions[0]
  },
  'print/action1': {
    print: {
      title: "Example d'impression",
      extension: '.csv',
      content:
        'CiAgICAgICJFeGFtcGxlIgogICAgCiAgICAgIAogICAgICAibmFtZSIKICAgICAgImFhYWEiCiAgICAgICJ2YWx1ZSIKICAgICAgIjUiCiAgICAgICJwcmljZSIKICAgICAgIjEwMC4wMCIKICAgICAgImRhdGUiCiAgICAgICItLS0iCiAgICAgICJ0aW1lIgogICAgICAiMDA6MDAiCiAgICAgICJ2YWxpZCIKICAgICAgIk5vbiIKICAgICAgImNvbW1lbnQiCiAgICAgICJxcXFxIgogICAgCg=='
    },
    context: {},
    meta: {
      extension: 'example.sub1',
      action: 'action1',
      title: 'Action 1a',
      observer: 'core.print'
    },
    close: null
  },
  'ack/action1': {
    context: {},
    close: null,
    action: null,
    meta: {
      extension: 'ack',
      action: 'action3',
      title: 'ACK 3',
      observer: 'core.acknowledge'
    }
  },
  'ack/action2': {
    context: {},
    close: null,
    action: example_logon_actions[0],
    meta: {
      extension: 'ack',
      action: 'action2',
      title: 'ACK 2',
      observer: 'core.acknowledge'
    }
  },
  'ack/action3': {
    context: {},
    close: example_logon_actions[1],
    action: null,
    meta: {
      extension: 'ack',
      action: 'action3',
      title: 'ACK 3',
      observer: 'core.acknowledge'
    }
  },
  'erreur/action1': {
    context: {},
    close: null,
    exception: {
      type: 'LucteriosException',
      debug:
        '/usr/local/lib/python3.4/site-packages/django/views/generic/base.py in line 88 in dispatch: return handler(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 332 in get: return self.get_post(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferadvance.py in line 162 in get_post: self._initialize(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 260 in _initialize: self._search_model(){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 172 in _search_model: self._load_unique_record(ids[0]){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 160 in _load_unique_record: IMPORTANT, _("This record not exist!\\nRefresh your application.")){[br/]}',
      message: 'Erreur 1',
      code: 4,
      request: '',
      response: ''
    },
    meta: {
      extension: 'erreur',
      action: 'action1',
      title: 'Erreur 1',
      observer: 'core.exception'
    }
  },
  'erreur.sub/action1': {
    context: {},
    close: null,
    exception: {
      type: 'LucteriosException',
      debug:
        '/usr/local/lib/python3.4/site-packages/django/views/generic/base.py in line 88 in dispatch: return handler(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 332 in get: return self.get_post(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferadvance.py in line 162 in get_post: self._initialize(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 260 in _initialize: self._search_model(){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 172 in _search_model: self._load_unique_record(ids[0]){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 160 in _load_unique_record: IMPORTANT, _("This record not exist!\\nRefresh your application.")){[br/]}',
      message: 'Erreur 1',
      code: 3,
      request: '',
      response: ''
    },
    meta: {
      extension: 'erreur',
      action: 'action1',
      title: 'Erreur 1',
      observer: 'core.exception'
    }
  },
  'erreur.sub/action2': {
    context: {},
    close: null,
    exception: {
      type: 'LucteriosException',
      debug:
        '/usr/local/lib/python3.4/site-packages/django/views/generic/base.py in line 88 in dispatch: return handler(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 332 in get: return self.get_post(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferadvance.py in line 162 in get_post: self._initialize(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 260 in _initialize: self._search_model(){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 172 in _search_model: self._load_unique_record(ids[0]){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 160 in _load_unique_record: IMPORTANT, _("This record not exist!\\nRefresh your application.")){[br/]}',
      message: 'Erreur 2b',
      code: 2,
      request: '',
      response: ''
    },
    meta: {
      extension: 'erreur',
      action: 'action2',
      title: 'Erreur 2b',
      observer: 'core.exception'
    }
  },
  'erreur.sub/action3': {
    context: {},
    close: null,
    exception: {
      type: 'LucteriosException',
      debug:
        '/usr/local/lib/python3.4/site-packages/django/views/generic/base.py in line 88 in dispatch: return handler(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 332 in get: return self.get_post(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferadvance.py in line 162 in get_post: self._initialize(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 260 in _initialize: self._search_model(){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 172 in _search_model: self._load_unique_record(ids[0]){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 160 in _load_unique_record: IMPORTANT, _("This record not exist!\\nRefresh your application.")){[br/]}',
      message: 'Erreur 2c',
      code: 1,
      request: 'erreur.sub/action4?aa=1&bb=true',
      response: JSON.stringify(example_logon_actions)
    },
    meta: {
      extension: 'erreur',
      action: 'action3',
      title: 'Erreur 2c',
      observer: 'core.exception'
    }
  },
  'erreur.sub/action4': {
    context: {},
    close: null,
    exception: {
      type: 'LucteriosException',
      debug:
        '/usr/local/lib/python3.4/site-packages/django/views/generic/base.py in line 88 in dispatch: return handler(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 332 in get: return self.get_post(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferadvance.py in line 162 in get_post: self._initialize(request, *args, **kwargs){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 260 in _initialize: self._search_model(){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 172 in _search_model: self._load_unique_record(ids[0]){[br/]}/home/dev/Lucterios2/lct-core/lucterios/framework/xferbasic.py in line 160 in _load_unique_record: IMPORTANT, _("This record not exist!\\nRefresh your application.")){[br/]}',
      message: 'Erreur 2d',
      code: 0,
      request: 'erreur.sub/action4?aa=1&bb=true',
      response: JSON.stringify(example_logon_actions)
    },
    meta: {
      extension: 'erreur',
      action: 'action4',
      title: 'Erreur 2d',
      observer: 'core.exception'
    }
  }
}
