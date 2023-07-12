# 2023_Orientation

此Project的script部分是以TypeScript完成

- `master`分支存放可運行的完整程式碼
- `develop`分支會包含一個資料夾`dev`, 存放ts的原始碼


##### `dev/scripts/declare.d.ts`檔案有每個class的定義註解

---

#### DynamicEntity

`dynamicEntity`為`Entity`的子類, 給予`位置(Position)`可能會需要變動的`Entity`, 例如`NPC`, `玩家(Player)`, `傳送門(Portal)`等。
目前我在函式`setPosition(x: number, y: number)`當中是使用px來做為位置的單位, 如果需要我調整程式碼請通知我。

---
