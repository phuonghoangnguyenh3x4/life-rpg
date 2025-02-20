@echo off
wt -M -d "E:\life-rpg-vite" -p "Git Bash"; ^
split-pane -V -d "E:\life-rpg-backend" -p "Git Bash"; ^
move-focus left; ^
split-pane -H -d "E:\life-rpg-backend" cmd /k flask --app main run --debug; ^
move-focus right; ^
split-pane -H -d "E:\life-rpg-vite" cmd /k npm run dev
code "E:\life-rpg-vite" & code -n "E:\life-rpg-backend"