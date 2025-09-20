---
title: "Mermaid Diagrams Demo"
date: 2025-09-20
tags: ["diagrams", "mermaid", "visualization"]
description: "A demonstration of various Mermaid diagram types"
---

# Mermaid Diagrams in Hugo

This article demonstrates how to use Mermaid diagrams in your Hugo website.

## Flowchart Example

{{< mermaid >}}
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> E[Fix issues]
    E --> B
    C --> F[End]
{{< /mermaid >}}

## Sequence Diagram Example

{{< mermaid >}}
sequenceDiagram
    participant A as User
    participant B as Browser
    participant C as Server
    participant D as Database

    A->>B: Enter URL
    B->>C: HTTP Request
    C->>D: Query Data
    D-->>C: Return Data
    C-->>B: HTTP Response
    B-->>A: Display Page
{{< /mermaid >}}

## Gantt Chart Example

{{< mermaid >}}
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Planning Phase    :a1, 2025-01-01, 30d
    section Development
    Frontend          :a2, after a1, 45d
    Backend           :a3, after a1, 60d
    section Testing
    Testing Phase     :a4, after a2, 20d
{{< /mermaid >}}

## Class Diagram Example

{{< mermaid >}}
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +boolean indoor
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
{{< /mermaid >}}

## Usage

To create a Mermaid diagram, use the shortcode:

```markdown
{{</* mermaid */>}}
graph TD
    A --> B
{{</* /mermaid */>}}
```

You can also use fenced code blocks with the `mermaid` language identifier:

```mermaid
pie title Pet Ownership
    "Dogs" : 386
    "Cats" : 85
    "Fish" : 15
```
