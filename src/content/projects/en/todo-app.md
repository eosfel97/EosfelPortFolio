---
title: "React Todo Application"
slug: "todo-app"
description: "A task management application built with React, TypeScript and a Spring Boot API. Demonstrates state management, API calls and a responsive interface."
pubDate: 2024-01-15
techs: ["React", "TypeScript", "Spring Boot", "PostgreSQL"]
featured: true
status: "completed"
repoUrl: "https://github.com/anygnahiet/todo-app"
liveUrl: "https://todo.anygnahiet.dev"
---

## Overview

This task management application is a full-stack project showcasing communication between a React frontend and a Spring Boot REST API.

## Features

- Create, edit and delete tasks
- Filter by status (todo, in-progress, done)
- PostgreSQL persistence
- Responsive, keyboard-accessible interface

## Technical challenges

The main challenge was optimistic state synchronization between the client and the backend. I implemented an optimistic update pattern with rollback on network error.

## What I learned

- React state management without external libraries (Context API + useReducer)
- Designing a versioned REST API with Spring Boot
- Integration testing with Testcontainers
