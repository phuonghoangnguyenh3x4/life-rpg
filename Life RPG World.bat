@echo off
wt -M -d "E:\life-rpg" git-cmd; ^
split-pane -V -d "E:\life-rpg-backend" git-cmd; ^
move-focus left; ^
split-pane -H -d "E:\life-rpg-backend" cmd /k flask --app main run --debug; ^
move-focus right; ^
split-pane -H -d "E:\life-rpg" cmd /k npm start
