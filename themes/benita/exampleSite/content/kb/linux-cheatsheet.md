---
title: "Linux Command Cheat Sheet"
description: "Quick reference for common Linux commands used in DevOps workflows."
date: 2024-01-10
toc: true
tags: ["linux", "cheatsheet", "devops", "bash"]
weight: 1
---

## File System

| Command | Description |
|---|---|
| `ls -lah` | List files with human-readable sizes |
| `find / -name "file"` | Search for files by name |
| `du -sh *` | Directory sizes in current path |
| `df -h` | Disk usage per filesystem |
| `stat file` | Detailed file metadata |

## Process Management

```bash
# List all processes
ps aux

# Find a process by name
pgrep -a nginx

# Kill a process by PID
kill -9 <PID>

# Monitor processes live
htop
```

## Networking

```bash
# Show IP addresses
ip addr show

# Check open ports
ss -tulnp

# Test connectivity
curl -I https://example.com

# DNS lookup
dig +short example.com
```

## Permissions

```bash
# Give execute permission
chmod +x script.sh

# Recursive ownership change
chown -R user:group /path

# Umask for new files
umask 022
```

## Disk & Filesystem

```bash
# Mount a disk
mount /dev/sdb1 /mnt/data

# Check filesystem
fsck /dev/sdb1

# Create ext4 partition
mkfs.ext4 /dev/sdb1
```

<div class="callout callout-danger">
  <svg class="callout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
  <div class="callout-content"><p>Always double-check before running <code>rm -rf</code>. There is no recycle bin on Linux servers.</p></div>
</div>
