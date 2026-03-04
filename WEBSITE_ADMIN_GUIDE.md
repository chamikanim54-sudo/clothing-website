# CN CLOTHING - වෙබ් අඩවිය කළමනාකරණය කිරීමේ අත්පොත (Admin Guide)

මෙම ගොනුව ඔබේ වෙබ් අඩවියේ තොරතුරු වෙනස් කරන ආකාරය පිළිබඳව ඔබට පමණක් කියවා බැලීමට සකස් කරන ලද උපදෙස් මාලාවකි. වෙබ් අඩවියේ ක්‍රියාකාරීත්වයට මෙයින් බලපෑමක් නොමැත.

---

## 1. අලුත් Product එකක් එකතු කරන්නේ කොහොමද? (How to add a Product)

`shop.html` ගොනුවේ අලුත් භාණ්ඩයක් ඇතුළත් කිරීමට අවශ්‍ය නම්, පහත පියවර අනුගමනය කරන්න:

1. `shop.html` ගොනුව විවෘත කරන්න.
2. `<div class="horizontal-grid" id="productsGrid">` යන කොටස සොයාගන්න.
3. ඒ තුළ ඕනෑම `product-card` එකක් අවසානයේ පහත Code එක Copy-Paste කරන්න:

```html
<!-- අලුත් Product එකක් එකතු කිරීමේ Template එක -->
<div class="product-card" data-name="භාණ්ඩයේ නම" data-price="මිල" data-category="men">
    <div class="product-img-wrap">
        <img src="ඔබේ_image_ලින්ක්_එක.jpg" alt="Description" />
        <div class="product-actions" style="display:flex;">
            <!-- මෙහි (නම, මිල, image link) නිවැරදිව පිරවිය යුතුය -->
            <button class="product-action-btn" onclick="openSizeModal('භාණ්ඩයේ නම', මිල, 'image_link')">Add to Order</button>
            <button class="product-action-btn wishlist-btn" onclick="toggleWishlist(this, 'භාණ්ඩයේ නම')" style="flex:0 0 50px; background:rgba(0,0,0,0.85); border-left:1px solid rgba(255,255,255,0.1);"><i class="far fa-heart"></i></button>
        </div>
    </div>
    <div class="product-info">
        <div class="product-category">Category එක (උදා: Men's Elite)</div>
        <h3 class="product-name">භාණ්ඩයේ නම</h3>
        <div class="product-price">LKR මිල</div>
    </div>
</div>
```

---

## 2. Product එකක් Click කළ විට පෙන්වන විස්තරය (Product Description)

භාණ්ඩයක් මත Click කළ විට එහි සවිස්තරාත්මක තොරතුරු පෙන්වීමට නම්, `product-img-wrap` එකට `openDetailModal` function එක ඇතුළත් කළ යුතුය.

**භාවිතා කරන ආකාරය:**
```html
<div class="product-img-wrap" onclick="openDetailModal('නම', මිල, 'image_link', 'කාණ්ඩය', 'විස්තරය')" style="cursor: pointer;">
```

*   **විස්තරය (Description):** ඔබට එම ඇඳුම ගැන ලිවීමට අවශ්‍ය ඕනෑම විස්තරයක් මෙහි අවසානයට ඇතුළත් කළ හැකිය.
*   **උදාහරණයක්:** `onclick="openDetailModal('Elite Hoodie', 5500, 'img.jpg', 'Men', 'ඉතා උසස් තත්වයේ රෙද්දෙන් නිමවා ඇත.')"`ltw1

---

## 3. මිල ගණන් සහ නම් වෙනස් කරන්නේ කොහොමද? (Changing Price/Name)

භාණ්ඩයක මිල වෙනස් කිරීමට අවශ්‍ය නම්:
1. `data-price="මිල"` යන තැන අගය වෙනස් කරන්න. (සිංහල අකුරු නොවන, ඉලක්කම් පමණක් භාවිතා කරන්න - උදා: 5000).
2. `product-price` ප්ලාස් එක තුළ ඇති "LKR 5,000" යන කොටස වෙනස් කරන්න.
3. **වැදගත්ම දේ:** `openSizeModal` එක ඇතුළත ඇති මිල ද වෙනස් කරන්න. එසේ නොකළහොත් Cart එකට වැටෙන්නේ පැරණි මිලයි.

---

## 3. Images මාරු කරන්නේ කොහොමද? (Changing Images)

ඔබට අලුත් Image එකක් දැමීමට අවශ්‍ය නම්:
*   ඔබේ Computer එකේ ඇති image එකක් නම්: එය `images` folder එකට දමා, එහි නම `src="images/my-shirt.jpg"` ලෙස ලබා දෙන්න.
*   Internet එකේ ඇති image එකක් නම්: එහි සම්පූර්ණ ලින්ක් එක (Link) `src` එකට ලබා දෙන්න.

---

## 4. Logo එක හෝ පාඨයන් (Text) වෙනස් කිරීම

*   **Logo එක:** සියලුම පිටුවල ඉහළින්ම `<div class="logo-text">` කොටස ඇත. එහි ඇති `CN CLOTHING` හෝ `Maison De Luxe` යන වචන ඔබට අවශ්‍ය ලෙස වෙනස් කළ හැකිය.
*   **වෙනත් තොරතුරු:** දුරකථන අංක, ලිපිනයන් වැනි දේ `index.html` හෝ `contact.html` යන ගොනුවල සොයාගෙන අකුරු ලෙසම වෙනස් කළ හැකිය.

---

## 5. වෙබ් අඩවියේ ගොනු සැකැස්ම (File Structure)

*   `index.html`: මුල් පිටුව (Home Page).
*   `shop.html`: භාණ්ඩ මිලදී ගන්නා පිටුව (Shop Page).
*   `collections.html`: Lookbook/Collections පිටුව.
*   `about.html`: අප ගැන විස්තර (About Us).
# CN CLOTHING - වෙබ් අඩවිය කළමනාකරණය කිරීමේ අත්පොත (Admin Guide)

මෙම ගොනුව ඔබේ වෙබ් අඩවියේ තොරතුරු වෙනස් කරන ආකාරය පිළිබඳව ඔබට පමණක් කියවා බැලීමට සකස් කරන ලද උපදෙස් මාලාවකි. වෙබ් අඩවියේ ක්‍රියාකාරීත්වයට මෙයින් බලපෑමක් නොමැත.

---

## 1. අලුත් Product එකක් එකතු කරන්නේ කොහොමද? (How to add a Product)

`shop.html` ගොනුවේ අලුත් භාණ්ඩයක් ඇතුළත් කිරීමට අවශ්‍ය නම්, පහත පියවර අනුගමනය කරන්න:

1. `shop.html` ගොනුව විවෘත කරන්න.
2. `<div class="horizontal-grid" id="productsGrid">` යන කොටස සොයාගන්න.
3. ඒ තුළ ඕනෑම `product-card` එකක් අවසානයේ පහත Code එක Copy-Paste කරන්න:

```html
<!-- අලුත් Product එකක් එකතු කිරීමේ Template එක -->
<div class="product-card" data-name="භාණ්ඩයේ නම" data-price="මිල" data-category="men">
    <div class="product-img-wrap">
        <img src="ඔබේ_image_ලින්ක්_එක.jpg" alt="Description" />
        <div class="product-actions" style="display:flex;">
            <!-- මෙහි (නම, මිල, image link) නිවැරදිව පිරවිය යුතුය -->
            <button class="product-action-btn" onclick="openSizeModal('භාණ්ඩයේ නම', මිල, 'image_link')">Add to Order</button>
            <button class="product-action-btn wishlist-btn" onclick="toggleWishlist(this, 'භාණ්ඩයේ නම')" style="flex:0 0 50px; background:rgba(0,0,0,0.85); border-left:1px solid rgba(255,255,255,0.1);"><i class="far fa-heart"></i></button>
        </div>
    </div>
    <div class="product-info">
        <div class="product-category">Category එක (උදා: Men's Elite)</div>
        <h3 class="product-name">භාණ්ඩයේ නම</h3>
        <div class="product-price">LKR මිල</div>
    </div>
</div>
```

---

## 2. Product එකක් Click කළ විට පෙන්වන විස්තරය (Product Description)

භාණ්ඩයක් මත Click කළ විට එහි සවිස්තරාත්මක තොරතුරු පෙන්වීමට නම්, `product-img-wrap` එකට `openDetailModal` function එක ඇතුළත් කළ යුතුය.

**භාවිතා කරන ආකාරය:**
```html
<div class="product-img-wrap" onclick="openDetailModal('නම', මිල, 'image_link', 'කාණ්ඩය', 'විස්තරය')" style="cursor: pointer;">
```

*   **විස්තරය (Description):** ඔබට එම ඇඳුම ගැන ලිවීමට අවශ්‍ය ඕනෑම විස්තරයක් මෙහි අවසානයට ඇතුළත් කළ හැකිය.
*   **උදාහරණයක්:** `onclick="openDetailModal('Elite Hoodie', 5500, 'img.jpg', 'Men', 'ඉතා උසස් තත්වයේ රෙද්දෙන් නිමවා ඇත.')"`ltw1

---

## 3. මිල ගණන් සහ නම් වෙනස් කරන්නේ කොහොමද? (Changing Price/Name)

භාණ්ඩයක මිල වෙනස් කිරීමට අවශ්‍ය නම්:
1. `data-price="මිල"` යන තැන අගය වෙනස් කරන්න. (සිංහල අකුරු නොවන, ඉලක්කම් පමණක් භාවිතා කරන්න - උදා: 5000).
2. `product-price` ප්ලාස් එක තුළ ඇති "LKR 5,000" යන කොටස වෙනස් කරන්න.
3. **වැදගත්ම දේ:** `openSizeModal` එක ඇතුළත ඇති මිල ද වෙනස් කරන්න. එසේ නොකළහොත් Cart එකට වැටෙන්නේ පැරණි මිලයි.

---

## 3. Images මාරු කරන්නේ කොහොමද? (Changing Images)

ඔබට අලුත් Image එකක් දැමීමට අවශ්‍ය නම්:
*   ඔබේ Computer එකේ ඇති image එකක් නම්: එය `images` folder එකට දමා, එහි නම `src="images/my-shirt.jpg"` ලෙස ලබා දෙන්න.
*   Internet එකේ ඇති image එකක් නම්: එහි සම්පූර්ණ ලින්ක් එක (Link) `src` එකට ලබා දෙන්න.

---

## 4. Logo එක හෝ පාඨයන් (Text) වෙනස් කිරීම

*   **Logo එක:** සියලුම පිටුවල ඉහළින්ම `<div class="logo-text">` කොටස ඇත. එහි ඇති `CN CLOTHING` හෝ `Maison De Luxe` යන වචන ඔබට අවශ්‍ය ලෙස වෙනස් කළ හැකිය.
*   **වෙනත් තොරතුරු:** දුරකථන අංක, ලිපිනයන් වැනි දේ `index.html` හෝ `contact.html` යන ගොනුවල සොයාගෙන අකුරු ලෙසම වෙනස් කළ හැකිය.

---

## 5. වෙබ් අඩවියේ ගොනු සැකැස්ම (File Structure)

*   `index.html`: මුල් පිටුව (Home Page).
*   `shop.html`: භාණ්ඩ මිලදී ගන්නා පිටුව (Shop Page).
*   `collections.html`: Lookbook/Collections පිටුව.
*   `about.html`: අප ගැන විස්තර (About Us).
*   `contact.html`: සම්බන්ධ කරගැනීමේ පෝරමය (Contact Us).
*   `css/style.css`: වෙබ් අඩවියේ වර්ණ සහ පෙනුම පාලනය කරන ගොනුව.
*   `js/main.js`: Cart එක, මෙනූ එක, සහ **Search System** එක පාලනය කරන ප්‍රධාන ගොනුව.
*   **නව විශේෂාංග (Advanced Features):**
    *   **Global Search:** ඕනෑම පිටුවක ඇති Search Icon එක Click කළ විට මුළු වෙබ් අඩවියේම ඇති Products සෙවිය හැකිය.
    *   **Lookbook Stories:** `collections.html` හි නව Editorial කොටසක් ඇතුළත් කර ඇත.

---

## 6. Global Search එකට අලුත් දේවල් එකතු කරන්නේ කොහොමද?

Global Search එක ක්‍රියාත්මක වන්නේ වෙබ් අඩවියේ ඇති `product-card` වල ඇති තොරතුරු මගිනි. එබැවින්, ඔබ අලුත් Product එකක් සාමාන්‍ය ක්‍රමයට ඇතුළත් කළ විට, එය ඉබේම Search එකටද එකතු වේ.

---

## 7. Lookbook එකේ විස්තර වෙනස් කිරීම (Managing Lookbook)

`collections.html` හි "The 2025 Vision" කොටසේ ඇති විස්තර වෙනස් කිරීමට:
1. `collections.html` විවෘත කරන්න.
2. `<div class="editorial-text">` යන කොටස සොයාගන්න.
3. එහි ඇති "A Study in Form" වැනි පාඨයන් ඔබට අවශ්‍ය ලෙස වෙනස් කරන්න.

---

## 8. Mobile & PC පෙනුම පරීක්ෂා කිරීම (Responsive Testing)

ඔබ කරන ඕනෑම වෙනස්කමක් Mobile Phone එකකදී පෙනෙන ආකාරය පරීක්ෂා කිරීමට:
*   Browser එකේ `F12` ඔබන්න.
*   පහළ ඇති 'Toggle Device Toolbar' (ටැබ්ලට්/ෆෝන් අයිකනය) Click කරන්න.

---

**මතක තබා ගන්න:** Code එකේ ඇති `< >` වැනි ලකුණු හෝ `"` වැනි ලකුණු ඉවත් නොකිරීමට වගබලා ගන්න. ඔබට කිසියම් ගැටලුවක් ආවොත්, ඒ අදාළ ලයින් එක මට එවන්න, මම එය නිවැරදි කර දෙන්නම්!

---

## 9. Responsive Design (Mobile & PC)

???? ????? ???? PC ?? Mobile ?? ????? ?????? ??? (Fully Responsive) ???? ??. 
*   **Mobile ?????:** ???? ??? ???? Logo ?? ?? ????? ?? ???????? ???????????? ??? ?? ???, Product Grid ?? ???????? scroll ?? ???? ??? ???? ??.
*   **PC ?????:** ????? ??? ???? ???? ??????? ??? ??? ??? ???????? ?? ??.

??? ??????? ???? ????? (Design) ????? ?????? ?????? ??? css/style.css ?????? ????? 'Responsive' ???? ????? ?? ?? ?????.
