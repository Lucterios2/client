import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    about: 'About...',
    version: 'version',
    use_lucterios_framework: 'Use the Lucterios framework',
    server: 'Serveur',
    client: 'Client',
    gpl_licence_tool: 'Tool of customize management on GPL license',
    thank_to_supporting: 'Thank you for supporting our work.',
    support: 'Support',
    Logon: 'Logon',
    email: 'Email',
    username: 'User-nameusername',
    password: 'Password',
    email_wrong: 'Email or password wrong!',
    username_wrong: 'Username or password wrong!',
    identify_you: 'Please, identify you',
    only_admin: 'Only administrators can access!',
    ok: 'OK',
    cancel: 'Cancel',
    field_required: 'Field is required',
    support_subject: 'Bug report',
    support_body: '\nDescrib your problem.\nThanks\n\n',
    refresh: 'Refresh',
    help: 'Help',
    login: 'Login',
    logoff: 'Logoff',
    Failure: 'Failure',
    Error: 'Error',
    Warning: 'Warning',
    Information: 'Information'
  },
  fr: {
    about: 'A propos...',
    version: 'version',
    use_lucterios_framework: "Utilise le cadre d'application Lucterios",
    server: 'Serveur',
    client: 'Client',
    gpl_licence_tool: 'Outil de gestion personnalisé sous licence GPL',
    thank_to_supporting: 'Merci de soutenir notre travail.',
    support: 'Support',
    Logon: 'Connexion',
    email: 'Courriel',
    username: 'Alias',
    password: 'Mot de passe',
    email_wrong: 'Courriel ou Mot de passe incorrect!',
    username_wrong: 'Alias ou Mot de passe incorrect!',
    identify_you: 'Veuillez vous identifier',
    only_admin: 'Seuls les administrateurs peuvent accéder !',
    ok: 'OK',
    cancel: 'Annuler',
    field_required: 'Champ demandé',
    support_subject: 'Rapport de bogue',
    support_body:
      '\nDécrivez le plus précisément possible, comment vous avez obtenu ce problème.\nMerci de votre aide.\n\n',
    refresh: 'Rafraichir',
    help: 'Aide',
    login: 'Connexion',
    logoff: 'Déconnexion',
    Failure: 'Écheck',
    Error: 'Erreur',
    Warning: 'Avertissement',
    Information: 'Information'
  }
}

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  legacy: false,
  globalInjection: true, // <--- add this
  messages
})

export default i18n
