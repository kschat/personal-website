#### My Dotfiles

My attempt at synchronizing settings between my desktop running Arch Linux and
my MacBook Pro. I use a bootstrap script that I wrote to detect the current
OS, detect the current package manager, install a package manager if one was
missing, install any missing dependencies, and symlink my dotfiles from the
repo to their appropriate locations using GNU Stow.
