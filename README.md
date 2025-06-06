# 🧠 Reli Frontend Assessment – React Native Expo App

This project is a sample mobile app built using **React Native with Expo**. It showcases a thoughtfully designed interface with multiple screens, bottom tab navigation, light/dark theming, and strong adherence to usability principles.

---

## 🚀 Technologies Used

- **React Native** (v0.79)
- **Expo SDK 53**
- **TypeScript**
- **Tailwind CSS via NativeWind**
- **React Native Reanimated** (v3)
- **React Navigation with expo-router**
- **ESLint & Prettier** for code quality
- **Safe Area Context** for proper screen layout

---

## 🧩 Design Rationale

This app is structured around simplicity and user clarity. The goal was to reflect **Jakob Nielsen's usability heuristics**, focusing especially on:

- **Visibility of system status** (feedback on button presses and theme toggling)
- **Consistency and standards** (platform-native gestures, navigation, and styling)
- **Aesthetic and minimalist design** (minimalist header, consistent spacing, accessible fonts/colors)
- **User control and freedom** (theme toggle, back navigation)

The use of Tailwind via NativeWind ensures consistent spacing, sizing, and color themes. The code is modular, typed, and scalable for production.

---

## 🧪 How to Run Locally

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npx expo start
```

4. **Run on your device:**

- Press `w` for web
- Press `a` for Android
- Press `i` for iOS (macOS only)

5. **(Optional) Format code:**

```bash
npm run format
```

---

## ✅ Usability Heuristics Covered

| Heuristic                           | Implementation Example                           |
| ----------------------------------- | ------------------------------------------------ |
| Visibility of system status         | Status bar + feedback animations                 |
| Match between system and real world | Tab icons, labels, header affordances            |
| User control and freedom            | Back navigation, dismissable dropdown menu       |
| Consistency and standards           | Consistent light/dark themes, native feel        |
| Aesthetic and minimalist design     | Clean layout, intentional spacing, minimal icons |
| Error prevention                    | Button feedback, disabled states (where needed)  |
| Recognition rather than recall      | Iconography, persistent navigation bar           |

---
