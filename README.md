# Refuge de chats – API REST

---

## Description sommaire de l’application publiée

Cette API REST permet la gestion des données d’un refuge de chats.

Elle offre les fonctionnalités suivantes :

- Consultation des chats
- Ajout, modification et suppression de chats
- Gestion des utilisateurs
- Sécurisation de certaines routes par authentification JWT

L’API est utilisée par l’application web du refuge de chats.

---

## Informations d’authentification

Certaines routes nécessitent une authentification :

- Ajouter un chat
- Modifier un chat
- Supprimer un chat

Compte de démonstration :

- Email : admin@example.com
- Mot de passe : 1234

L’authentification est gérée à l’aide de jetons JWT.

---

## Procédure d’installation de l’API sur un poste local

```bash
git clone https://github.com/Victo-2342698/refuge_api.git
cd refuge_api
npm install
npm run dev
```
