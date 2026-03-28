---
title: "Supply Chain Attack: litellm Package Compromised"
date: 2026-03-28
tags: ["security", "python", "supply-chain"]
description: "Version 1.82.8 of the litellm package is compromised and actively exfiltrates sensitive system data. Here's what you need to know and how to protect yourself."
---

## Very Important Security Warning

Version `1.82.8` of the `litellm` package is compromised and is actively collecting sensitive system data without your knowledge and sending it to an external server. This is a serious Supply Chain Attack and must be treated as critical.

The **dangerous** part: This does NOT require `import litellm`.

The package includes a malicious file named `litellm_init.pth` inside site-packages.

`.pth` files in site-packages are automatically executed when the Python interpreter starts (via the `site` module), so the payload runs silently in the background.

---

## What Data Can Be Stolen?

According to the report, the following data is at risk:

1. SSH keys
2. API keys and passwords (from environment variables)
3. AWS / Azure / GCP credentials
4. Kubernetes configs and service tokens
5. Docker and package manager configs
6. bash, zsh, MySQL, Redis histories
7. System and network information
8. CI/CD configs and secrets
9. SSL/TLS private keys

This malware aggressively scans common paths and config files to collect as much sensitive data as possible.

All collected data is encrypted (AES-256) and the key is secured using RSA, then sent to an external server: `https://models.litellm.cloud/`

> **Note:** This domain is **NOT** the official litellm domain.

---

## How to Check If You Are Affected

If you are on Linux or FreeBSD, run the following commands:

```shell
# Run in root of your project:
find . -type f -name 'litellm_init.pth'

# Check in user local packages:
find ~/.local/ -type f -name 'litellm_init.pth'
```

If you have `locate` installed:

```shell
updatedb
locate 'litellm_init.pth'
```

To check if your project uses litellm:

```shell
# Recursive search in current directory:
grep litellm -nr ./

# Check only requirements.txt:
grep litellm -n requirements.txt
```

---

## What To Do If You Found the File

1. **Rotate ALL API keys** immediately
2. **Generate new SSH keys**
3. **Rotate cloud credentials** (AWS, Azure, GCP)
4. **Revoke tokens and sessions**
5. **Review access logs** and check for unusual outbound traffic
6. **Remove the package** and upgrade to a safe version

---

## Important Notes

- Other versions may also be affected. Do **NOT** assume only `1.82.8` is impacted.
- No dependency should ever be fully trusted, even if it is popular.

---

Discovery date: March 24, 2026  
Source: [github.com/BerriAI/litellm/issues/24512](https://github.com/BerriAI/litellm/issues/24512)
