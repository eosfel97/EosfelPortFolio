---
title: "Application Todo React"
slug: "todo-app"
description: "Une application de gestion de tâches construite avec React, TypeScript et une API Spring Boot. Démontre la gestion d'état, les appels API et une interface responsive."
pubDate: 2024-01-15
techs: ["React", "TypeScript", "Spring Boot", "PostgreSQL"]
featured: true
status: "completed"
repoUrl: "https://github.com/anygnahiet/todo-app"
liveUrl: "https://todo.anygnahiet.dev"
---

## Présentation

Cette application de gestion de tâches est un projet full-stack qui met en avant la communication entre un frontend React et une API REST Spring Boot.

## Fonctionnalités

- Création, modification et suppression de tâches
- Filtrage par statut (à faire, en cours, terminé)
- Persistance en base PostgreSQL
- Interface responsive, accessible au clavier

## Défis techniques

Le principal défi était la synchronisation optimiste de l'état côté client avec le backend. J'ai choisi d'implémenter un pattern de mise à jour optimiste avec rollback en cas d'erreur réseau.

## Ce que j'ai appris

- Gestion d'état React sans bibliothèque externe (Context API + useReducer)
- Conception d'une API REST versionnée avec Spring Boot
- Tests d'intégration avec Testcontainers
