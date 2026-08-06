(function () {
  "use strict";

  var script = document.currentScript;
  var page = script && script.getAttribute("data-page");
  var locales = ["ko", "en", "ja", "zh-Hans", "zh-Hant", "vi", "es", "pt-BR", "de", "fr", "id", "it", "nl", "th", "tr", "pl", "ro", "cs", "ms", "el", "hu", "pt-PT", "uk", "fil", "sv", "da", "nb", "fi", "sk", "ru", "hr", "sl", "hi"];
  var labels = {
    ko: "한국어",
    en: "English",
    ja: "日本語",
    "zh-Hans": "简体中文",
    "zh-Hant": "繁體中文",
    vi: "Tiếng Việt",
    es: "Español",
    "pt-BR": "Português",
    de: "Deutsch",
    fr: "Français",
    id: "Bahasa Indonesia",
    it: "Italiano",
    nl: "Nederlands",
    th: "ไทย",
    tr: "Türkçe",
    pl: "Polski",
    ro: "Română",
    cs: "Čeština",
    ms: "Bahasa Melayu",
    el: "Ελληνικά",
    hu: "Magyar",
    "pt-PT": "Português (Portugal)",
    uk: "Українська",
    fil: "Filipino",
    sv: "Svenska",
    da: "Dansk",
    nb: "Norsk (bokmål)",
    fi: "Suomi",
    sk: "Slovenčina",
    ru: "Русский",
    hr: "Hrvatski",
    sl: "Slovenščina",
    hi: "हिन्दी"
};

  // 아래 privacyData 로케일 블록은 필드 순서만 맞춘 배열로 적어 파일을 짧게 유지한다.
  // 키 순서는 renderPrivacy()가 읽는 필드와 1:1로 대응한다.
  function privacyRecord(values) {
    var keys = [
      "heading", "effective", "intro", "deletionTitle", "deletion",
      "collectTitle", "headers", "rows", "payment", "excluded",
      "purposesTitle", "purposes", "retentionTitle", "retention",
      "refundTitle", "refunds", "processorsTitle", "processorsIntro",
      "processorHeaders", "processorTasks", "rightsTitle", "rights",
      "officerTitle", "officer", "contact", "support", "changesTitle", "changes"
    ];
    var record = {};
    for (var index = 0; index < keys.length; index += 1) {
      record[keys[index]] = values[index];
    }
    return record;
  }

  var pageTitles = {
    privacy: {
      ko: "DayRipple 개인정보처리방침",
      en: "DayRipple Privacy Policy",
      ja: "DayRipple プライバシーポリシー",
      "zh-Hans": "DayRipple 隐私政策",
      "zh-Hant": "DayRipple 隱私權政策",
      vi: "Chính sách quyền riêng tư của DayRipple",
      es: "Política de privacidad de DayRipple",
      "pt-BR": "Política de Privacidade do DayRipple",
      de: "Datenschutzerklärung von DayRipple",
      fr: "Politique de confidentialité de DayRipple",
      id: "Kebijakan Privasi DayRipple",
      it: "Informativa sulla privacy di DayRipple",
      nl: "Privacybeleid van DayRipple",
      th: "นโยบายความเป็นส่วนตัวของ DayRipple",
      tr: "DayRipple Gizlilik Politikası",
      pl: "Polityka prywatności DayRipple",
      ro: "Politica de confidențialitate DayRipple",
      cs: "Zásady ochrany osobních údajů DayRipple",
      ms: "Dasar Privasi DayRipple",
      el: "Πολιτική απορρήτου του DayRipple",
      hu: "A DayRipple adatvédelmi szabályzata",
      "pt-PT": "Política de Privacidade do DayRipple",
      uk: "Політика конфіденційності DayRipple",
      fil: "Patakaran sa Privacy ng DayRipple",
      sv: "DayRipples integritetspolicy",
      da: "DayRipples privatlivspolitik",
      nb: "DayRipples personvernerklæring",
      fi: "DayRipplen tietosuojakäytäntö",
      sk: "Zásady ochrany súkromia DayRipple",
      ru: "Политика конфиденциальности DayRipple",
      hr: "Pravila privatnosti aplikacije DayRipple",
      sl: "Politika zasebnosti DayRipple",
      hi: "DayRipple प्राइवेसी पॉलिसी"
},
    support: {
      ko: "DayRipple 지원",
      en: "DayRipple Support",
      ja: "DayRipple サポート",
      "zh-Hans": "DayRipple 帮助",
      "zh-Hant": "DayRipple 支援",
      vi: "Hỗ trợ DayRipple",
      es: "Ayuda de DayRipple",
      "pt-BR": "Ajuda do DayRipple",
      de: "DayRipple-Support",
      fr: "Assistance DayRipple",
      id: "Bantuan DayRipple",
      it: "Assistenza DayRipple",
      nl: "DayRipple-ondersteuning",
      th: "ความช่วยเหลือ DayRipple",
      tr: "DayRipple Destek",
      pl: "Pomoc DayRipple",
      ro: "Asistență DayRipple",
      cs: "Podpora DayRipple",
      ms: "Sokongan DayRipple",
      el: "Υποστήριξη DayRipple",
      hu: "DayRipple támogatás",
      "pt-PT": "Suporte DayRipple",
      uk: "Підтримка DayRipple",
      fil: "Suporta sa DayRipple",
      sv: "DayRipple-support",
      da: "DayRipple-support",
      nb: "DayRipple-brukerstøtte",
      fi: "DayRipple-tuki",
      sk: "Podpora DayRipple",
      ru: "Поддержка DayRipple",
      hr: "Podrška za DayRipple",
      sl: "Podpora za DayRipple",
      hi: "DayRipple सपोर्ट"
},
    delete: {
      ko: "DayRipple 계정 삭제 요청",
      en: "Delete your DayRipple account",
      ja: "DayRippleアカウントの削除",
      "zh-Hans": "删除 DayRipple 账户",
      "zh-Hant": "刪除 DayRipple 帳號",
      vi: "Xóa tài khoản DayRipple",
      es: "Eliminar tu cuenta de DayRipple",
      "pt-BR": "Excluir sua conta do DayRipple",
      de: "DayRipple-Konto löschen",
      fr: "Supprimer votre compte DayRipple",
      id: "Hapus akun DayRipple",
      it: "Elimina il tuo account DayRipple",
      nl: "Je DayRipple-account verwijderen",
      th: "ลบบัญชี DayRipple ของคุณ",
      tr: "DayRipple hesabını sil",
      pl: "Usuń konto DayRipple",
      ro: "Șterge contul DayRipple",
      cs: "Smazat účet DayRipple",
      ms: "Padam akaun DayRipple",
      el: "Διαγραφή λογαριασμού DayRipple",
      hu: "DayRipple-fiók törlése",
      "pt-PT": "Eliminar a sua conta DayRipple",
      uk: "Видалити обліковий запис DayRipple",
      fil: "I-delete ang iyong DayRipple account",
      sv: "Ta bort ditt DayRipple-konto",
      da: "Slet din DayRipple-konto",
      nb: "Slett DayRipple-kontoen din",
      fi: "Poista DayRipple-tilisi",
      sk: "Odstrániť účet DayRipple",
      ru: "Удалить аккаунт DayRipple",
      hr: "Izbriši račun DayRipple",
      sl: "Izbriši račun DayRipple",
      hi: "अपना DayRipple अकाउंट डिलीट करें"
},
  };

  var supportData = {
    ja: {
      intro: "大切な人と予定・記念日・やることを気軽に共有できる、DayRippleのサポートページです。",
      contact: "お問い合わせ",
      paymentTitle: "購入が完了しなかった場合",
      payment: "アプリで<b>設定 → お支払い状況 → 未完了の購入を確認</b>をタップしてください。同じストア取引を複数のスペースに適用することはできません。",
      deleteTitle: "アカウントの削除",
      delete: "アプリの<b>設定 → アカウント → アカウントを削除</b>から削除するか、<a href=\"./delete-account.html\">アカウント削除リクエストページ</a>をご利用ください。",
      privacy: "プライバシーポリシー",
    },
    "zh-Hans": {
      intro: "这是 DayRipple 的帮助页面。你可以通过 DayRipple 与亲近的人轻松共享日程、纪念日和待办事项。",
      contact: "联系我们",
      paymentTitle: "购买未完成时",
      payment: "请在应用中依次轻触<b>设置 → 付款状态 → 检查未完成的购买</b>。同一笔商店交易不能重复用于多个空间。",
      deleteTitle: "删除账户",
      delete: "你可以在应用的<b>设置 → 账户 → 删除账户</b>中直接删除，也可以使用<a href=\"./delete-account.html\">账户删除申请页面</a>。",
      privacy: "隐私政策",
    },
    "zh-Hant": {
      intro: "這是 DayRipple 的支援頁面。你可以透過 DayRipple 與親近的人輕鬆共享行程、紀念日和待辦事項。",
      contact: "聯絡我們",
      paymentTitle: "購買未完成時",
      payment: "請在應用程式中依序點選<b>設定 → 付款狀態 → 檢查未完成的購買</b>。同一筆商店交易不能重複套用至多個空間。",
      deleteTitle: "刪除帳號",
      delete: "你可以在應用程式的<b>設定 → 帳號 → 刪除帳號</b>中直接刪除，也可以使用<a href=\"./delete-account.html\">帳號刪除申請頁面</a>。",
      privacy: "隱私權政策",
    },
    vi: {
      intro: "Đây là trang hỗ trợ của DayRipple, ứng dụng giúp bạn chia sẻ lịch, ngày kỷ niệm và việc cần làm với những người thân thiết.",
      contact: "Liên hệ",
      paymentTitle: "Khi giao dịch chưa hoàn tất",
      payment: "Trong ứng dụng, hãy nhấn <b>Cài đặt → Trạng thái thanh toán → Kiểm tra giao dịch chưa hoàn tất</b>. Một giao dịch trên cửa hàng không thể được áp dụng cho nhiều không gian.",
      deleteTitle: "Xóa tài khoản",
      delete: "Bạn có thể xóa ngay trong ứng dụng tại <b>Cài đặt → Tài khoản → Xóa tài khoản</b>, hoặc dùng <a href=\"./delete-account.html\">trang yêu cầu xóa tài khoản</a>.",
      privacy: "Chính sách quyền riêng tư",
    },
    es: {
      intro: "Esta es la página de ayuda de DayRipple, una forma sencilla de compartir planes, aniversarios y tareas con las personas que te importan.",
      contact: "Contacto",
      paymentTitle: "Si una compra no se completó",
      payment: "En la app, toca <b>Ajustes → Estado del pago → Comprobar compras sin finalizar</b>. Una misma transacción de la tienda no puede aplicarse a más de un espacio.",
      deleteTitle: "Eliminar la cuenta",
      delete: "Puedes eliminarla directamente en <b>Ajustes → Cuenta → Eliminar cuenta</b>, o utilizar la <a href=\"./delete-account.html\">página de solicitud de eliminación</a>.",
      privacy: "Política de privacidad",
    },
    "pt-BR": {
      intro: "Esta é a página de ajuda do DayRipple, um jeito simples de compartilhar eventos, datas especiais e tarefas com pessoas próximas.",
      contact: "Contato",
      paymentTitle: "Se uma compra não foi concluída",
      payment: "No app, toque em <b>Ajustes → Status do pagamento → Verificar compras não concluídas</b>. A mesma transação da loja não pode ser aplicada a mais de um espaço.",
      deleteTitle: "Excluir a conta",
      delete: "Você pode excluir diretamente em <b>Ajustes → Conta → Excluir conta</b> ou usar a <a href=\"./delete-account.html\">página de solicitação de exclusão</a>.",
      privacy: "Política de Privacidade",
    },
    de: {
      intro: "Dies ist die Supportseite von DayRipple – zum einfachen Teilen von Terminen, Jahrestagen und Aufgaben mit Menschen, die dir nahestehen.",
      contact: "Kontakt",
      paymentTitle: "Wenn ein Kauf nicht abgeschlossen wurde",
      payment: "Tippe in der App auf <b>Einstellungen → Zahlungsstatus → Nicht abgeschlossene Käufe prüfen</b>. Dieselbe Store-Transaktion kann nicht auf mehrere Bereiche angewendet werden.",
      deleteTitle: "Konto löschen",
      delete: "Du kannst dein Konto direkt unter <b>Einstellungen → Konto → Konto löschen</b> löschen oder die <a href=\"./delete-account.html\">Seite für Löschanträge</a> verwenden.",
      privacy: "Datenschutzerklärung",
    },
    fr: {
      intro: "Voici la page d’assistance de DayRipple, une façon simple de partager événements, anniversaires et tâches avec vos proches.",
      contact: "Contact",
      paymentTitle: "Si un achat n’a pas abouti",
      payment: "Dans l’app, touchez <b>Réglages → État du paiement → Vérifier les achats non finalisés</b>. Une même transaction ne peut pas être associée à plusieurs espaces.",
      deleteTitle: "Suppression du compte",
      delete: "Vous pouvez supprimer votre compte dans <b>Réglages → Compte → Supprimer le compte</b> ou utiliser la <a href=\"./delete-account.html\">page de demande de suppression</a>.",
      privacy: "Politique de confidentialité",
    },
    id: {
      intro: "Ini adalah halaman bantuan DayRipple, cara mudah berbagi jadwal, hari jadi, dan tugas dengan orang-orang terdekat.",
      contact: "Kontak",
      paymentTitle: "Jika pembelian belum selesai",
      payment: "Di aplikasi, ketuk <b>Pengaturan → Status pembayaran → Periksa pembelian yang belum selesai</b>. Satu transaksi toko tidak dapat diterapkan ke lebih dari satu ruang.",
      deleteTitle: "Hapus akun",
      delete: "Kamu bisa menghapus akun langsung melalui <b>Pengaturan → Akun → Hapus akun</b>, atau menggunakan <a href=\"./delete-account.html\">halaman permintaan penghapusan akun</a>.",
      privacy: "Kebijakan Privasi",
    },
    it: {
      intro: "Questa è la pagina di assistenza di DayRipple, per condividere facilmente eventi, anniversari e cose da fare con le persone a cui tieni.",
      contact: "Contatti",
      paymentTitle: "Se un acquisto non è andato a buon fine",
      payment: "Nell'app tocca <b>Impostazioni → Stato del pagamento → Controlla gli acquisti non completati</b>. La stessa transazione dello store non può essere applicata a più spazi.",
      deleteTitle: "Eliminare l'account",
      delete: "Puoi eliminare il tuo account direttamente da <b>Impostazioni → Account → Elimina account</b> oppure usare la <a href=\"./delete-account.html\">pagina per le richieste di eliminazione</a>.",
      privacy: "Informativa sulla privacy",
    },
    nl: {
      intro: "Dit is de ondersteuningspagina van DayRipple, om eenvoudig afspraken, jubilea en taken te delen met mensen die je na staan.",
      contact: "Contact",
      paymentTitle: "Als een aankoop niet is voltooid",
      payment: "Tik in de app op <b>Instellingen → Betalingsstatus → Onvoltooide aankopen controleren</b>. Dezelfde storetransactie kan niet op meerdere ruimtes worden toegepast.",
      deleteTitle: "Account verwijderen",
      delete: "Je kunt je account direct verwijderen via <b>Instellingen → Account → Account verwijderen</b> of de <a href=\"./delete-account.html\">pagina voor verwijderingsverzoeken</a> gebruiken.",
      privacy: "Privacybeleid",
    },
    th: {
      intro: "นี่คือหน้าความช่วยเหลือของ DayRipple สำหรับแชร์กิจกรรม วันครบรอบ และสิ่งที่ต้องทำกับคนใกล้ตัวได้อย่างง่ายดาย",
      contact: "ติดต่อเรา",
      paymentTitle: "หากการซื้อไม่สำเร็จ",
      payment: "ในแอปให้แตะ <b>ตั้งค่า → สถานะการชำระเงิน → ตรวจสอบการซื้อที่ยังไม่เสร็จ</b> ธุรกรรมเดียวกันของสโตร์ไม่สามารถใช้กับหลายพื้นที่ได้",
      deleteTitle: "ลบบัญชี",
      delete: "คุณลบบัญชีได้โดยตรงที่ <b>ตั้งค่า → บัญชี → ลบบัญชี</b> หรือใช้<a href=\"./delete-account.html\">หน้าคำขอลบบัญชี</a>",
      privacy: "นโยบายความเป็นส่วนตัว",
    },
    tr: {
      intro: "Burası DayRipple destek sayfası — sana yakın kişilerle etkinlikleri, yıldönümlerini ve yapılacakları kolayca paylaşmak için.",
      contact: "İletişim",
      paymentTitle: "Bir satın alma tamamlanmadıysa",
      payment: "Uygulamada <b>Ayarlar → Ödeme durumu → Tamamlanmamış satın alımları kontrol et</b> seçeneğine dokun. Aynı mağaza işlemi birden fazla alana uygulanamaz.",
      deleteTitle: "Hesabı silme",
      delete: "Hesabını doğrudan <b>Ayarlar → Hesap → Hesabı sil</b> üzerinden silebilir ya da <a href=\"./delete-account.html\">silme talebi sayfasını</a> kullanabilirsin.",
      privacy: "Gizlilik Politikası",
    },
    pl: {
      intro: "To strona pomocy DayRipple — prostego sposobu na udostępnianie wydarzeń, rocznic i zadań bliskim osobom.",
      contact: "Kontakt",
      paymentTitle: "Gdy zakup nie został ukończony",
      payment: "W aplikacji wybierz <b>Ustawienia → Status płatności → Sprawdź niedokończone zakupy</b>. Tej samej transakcji ze sklepu nie można przypisać do więcej niż jednej przestrzeni.",
      deleteTitle: "Usuwanie konta",
      delete: "Konto możesz usunąć bezpośrednio w <b>Ustawienia → Konto → Usuń konto</b> albo skorzystać ze <a href=\"./delete-account.html\">strony żądania usunięcia konta</a>.",
      privacy: "Polityka prywatności",
    },
    ro: {
      intro: "Aceasta este pagina de asistență DayRipple — o modalitate simplă de a partaja evenimente, aniversări și sarcini cu persoanele apropiate.",
      contact: "Contact",
      paymentTitle: "Dacă o achiziție nu s-a finalizat",
      payment: "În aplicație, atinge <b>Setări → Starea plății → Verifică achizițiile nefinalizate</b>. Aceeași tranzacție din magazin nu poate fi atribuită mai multor spații.",
      deleteTitle: "Ștergerea contului",
      delete: "Poți șterge contul direct din <b>Setări → Cont → Șterge contul</b> sau poți folosi <a href=\"./delete-account.html\">pagina de solicitare a ștergerii contului</a>.",
      privacy: "Politica de confidențialitate",
    },
    cs: {
      intro: "Toto je stránka podpory DayRipple — jednoduchého způsobu sdílení událostí, výročí a úkolů s vašimi blízkými.",
      contact: "Kontakt",
      paymentTitle: "Pokud nákup nebyl dokončen",
      payment: "V aplikaci klepněte na <b>Nastavení → Stav platby → Zkontrolovat nedokončené nákupy</b>. Stejnou transakci z obchodu nelze použít pro více než jeden prostor.",
      deleteTitle: "Smazání účtu",
      delete: "Účet můžete smazat přímo v části <b>Nastavení → Účet → Smazat účet</b> nebo použít <a href=\"./delete-account.html\">stránku žádosti o smazání účtu</a>.",
      privacy: "Zásady ochrany osobních údajů",
    },
    ms: {
      intro: "Ini ialah halaman sokongan DayRipple — cara mudah untuk berkongsi acara, ulang tahun dan tugasan dengan orang tersayang.",
      contact: "Hubungi kami",
      paymentTitle: "Jika pembelian tidak selesai",
      payment: "Dalam aplikasi, ketik <b>Tetapan → Status pembayaran → Semak pembelian yang belum selesai</b>. Transaksi kedai yang sama tidak boleh digunakan pada lebih daripada satu ruang.",
      deleteTitle: "Pemadaman akaun",
      delete: "Anda boleh memadam akaun terus di <b>Tetapan → Akaun → Padam akaun</b> atau menggunakan <a href=\"./delete-account.html\">halaman permintaan pemadaman akaun</a>.",
      privacy: "Dasar Privasi",
    },
    el: {
      intro: "Αυτή είναι η σελίδα υποστήριξης του DayRipple — ενός απλού τρόπου να μοιράζεστε εκδηλώσεις, επετείους και εργασίες με τους κοντινούς σας ανθρώπους.",
      contact: "Επικοινωνία",
      paymentTitle: "Αν μια αγορά δεν ολοκληρώθηκε",
      payment: "Στην εφαρμογή, πατήστε <b>Ρυθμίσεις → Κατάσταση πληρωμής → Έλεγχος μη ολοκληρωμένων αγορών</b>. Η ίδια συναλλαγή καταστήματος δεν μπορεί να εφαρμοστεί σε περισσότερους από έναν χώρους.",
      deleteTitle: "Διαγραφή λογαριασμού",
      delete: "Μπορείτε να διαγράψετε τον λογαριασμό απευθείας από <b>Ρυθμίσεις → Λογαριασμός → Διαγραφή λογαριασμού</b> ή να χρησιμοποιήσετε τη <a href=\"./delete-account.html\">σελίδα αιτήματος διαγραφής λογαριασμού</a>.",
      privacy: "Πολιτική απορρήτου",
    },
    hu: {
      intro: "Ez a DayRipple támogatási oldala — egyszerű mód az események, évfordulók és teendők megosztására a hozzád közel állókkal.",
      contact: "Kapcsolat",
      paymentTitle: "Ha egy vásárlás nem fejeződött be",
      payment: "Az alkalmazásban koppints a <b>Beállítások → Fizetési állapot → Befejezetlen vásárlások ellenőrzése</b> menüpontra. Ugyanaz a bolti tranzakció nem alkalmazható egynél több térre.",
      deleteTitle: "Fiók törlése",
      delete: "A fiókot közvetlenül törölheted a <b>Beállítások → Fiók → Fiók törlése</b> menüpontban, vagy használhatod a <a href=\"./delete-account.html\">fióktörlési kérelmi oldalt</a>.",
      privacy: "Adatvédelmi szabályzat",
    },
    "pt-PT": {
      intro: "Esta é a página de suporte do DayRipple — uma forma simples de partilhar eventos, aniversários e tarefas com as pessoas que lhe são próximas.",
      contact: "Contacto",
      paymentTitle: "Se uma compra não tiver sido concluída",
      payment: "Na aplicação, toque em <b>Definições → Estado do pagamento → Verificar compras por concluir</b>. A mesma transação da loja não pode ser aplicada a mais do que um espaço.",
      deleteTitle: "Eliminação da conta",
      delete: "Pode eliminar a conta diretamente em <b>Definições → Conta → Eliminar conta</b> ou utilizar a <a href=\"./delete-account.html\">página de pedido de eliminação da conta</a>.",
      privacy: "Política de Privacidade",
    },
    uk: {
      intro: "Це сторінка підтримки DayRipple — простого способу ділитися подіями, річницями й завданнями з близькими людьми.",
      contact: "Зв’язатися з нами",
      paymentTitle: "Якщо покупку не завершено",
      payment: "У застосунку натисніть <b>Налаштування → Статус платежу → Перевірити незавершені покупки</b>. Одну й ту саму транзакцію магазину не можна застосувати до кількох просторів.",
      deleteTitle: "Видалення облікового запису",
      delete: "Обліковий запис можна видалити безпосередньо в розділі <b>Налаштування → Обліковий запис → Видалити обліковий запис</b> або скористатися <a href=\"./delete-account.html\">сторінкою запиту на видалення облікового запису</a>.",
      privacy: "Політика конфіденційності",
    },
    fil: {
      intro: "Ito ang pahina ng suporta para sa DayRipple — isang magaan na paraan upang magbahagi ng mga event, anibersaryo, at gawain sa mga taong malapit sa iyo.",
      contact: "Makipag-ugnayan",
      paymentTitle: "Kung hindi natapos ang pagbili",
      payment: "Sa app, i-tap ang <b>Mga Setting → Status ng pagbabayad → Suriin ang mga hindi natapos na pagbili</b>. Hindi maaaring ilapat ang iisang transaksyon sa store sa higit sa isang space.",
      deleteTitle: "Pag-delete ng account",
      delete: "Maaari mong i-delete ang account direkta sa <b>Mga Setting → Account → I-delete ang account</b>, o gamitin ang <a href=\"./delete-account.html\">pahina ng kahilingan sa pag-delete ng account</a>.",
      privacy: "Patakaran sa Privacy",
    },
    sv: {
      intro: "Det här är DayRipples supportsida — ett enkelt sätt att dela händelser, årsdagar och uppgifter med personer som står dig nära.",
      contact: "Kontakt",
      paymentTitle: "Om ett köp inte slutfördes",
      payment: "Tryck på <b>Inställningar → Betalningsstatus → Kontrollera oavslutade köp</b> i appen. Samma butikstransaktion kan inte användas för mer än ett utrymme.",
      deleteTitle: "Radera konto",
      delete: "Du kan radera kontot direkt under <b>Inställningar → Konto → Radera konto</b> eller använda <a href=\"./delete-account.html\">sidan för begäran om kontoradering</a>.",
      privacy: "Integritetspolicy",
    },
    da: {
      intro: "Dette er supportsiden for DayRipple — en enkel måde at dele begivenheder, mærkedage og opgaver med de mennesker, der står dig nær.",
      contact: "Kontakt",
      paymentTitle: "Hvis et køb ikke blev gennemført",
      payment: "Tryk på <b>Indstillinger → Betalingsstatus → Tjek uafsluttede køb</b> i appen. Den samme butikstransaktion kan ikke bruges til mere end ét rum.",
      deleteTitle: "Sletning af konto",
      delete: "Du kan slette kontoen direkte under <b>Indstillinger → Konto → Slet konto</b> eller bruge <a href=\"./delete-account.html\">siden til anmodning om sletning af konto</a>.",
      privacy: "Privatlivspolitik",
    },
    nb: {
      intro: "Dette er støttesiden for DayRipple — en enkel måte å dele hendelser, merkedager og oppgaver med menneskene som står deg nær.",
      contact: "Kontakt",
      paymentTitle: "Hvis et kjøp ikke ble fullført",
      payment: "Trykk på <b>Innstillinger → Betalingsstatus → Sjekk uferdige kjøp</b> i appen. Den samme butikktransaksjonen kan ikke brukes på mer enn ett rom.",
      deleteTitle: "Sletting av konto",
      delete: "Du kan slette kontoen direkte under <b>Innstillinger → Konto → Slett konto</b>, eller bruke <a href=\"./delete-account.html\">siden for forespørsel om kontosletting</a>.",
      privacy: "Personvernerklæring",
    },
    fi: {
      intro: "Tämä on DayRipplen tukisivu — kevyt tapa jakaa tapahtumia, vuosipäiviä ja tehtäviä läheistesi kanssa.",
      contact: "Yhteystiedot",
      paymentTitle: "Jos osto jäi kesken",
      payment: "Napauta sovelluksessa <b>Asetukset → Ostot → Tarkista keskeneräiset ostot</b>. Samaa kaupan tapahtumaa ei voi käyttää useammassa kuin yhdessä tilassa.",
      deleteTitle: "Tilin poistaminen",
      delete: "Voit poistaa tilin suoraan kohdassa <b>Asetukset → Tili → Poista tili</b> tai käyttää <a href=\"./delete-account.html\">tilin poistopyyntösivua</a>.",
      privacy: "Tietosuojakäytäntö",
    },
    sk: {
      intro: "Toto je stránka podpory pre DayRipple — jednoduchý spôsob, ako zdieľať udalosti, výročia a úlohy s blízkymi ľuďmi.",
      contact: "Kontakt",
      paymentTitle: "Ak sa nákup nedokončil",
      payment: "V aplikácii ťuknite na <b>Nastavenia → Stav platby → Skontrolovať nedokončené nákupy</b>. Tú istú transakciu z obchodu nemožno použiť pre viac než jeden priestor.",
      deleteTitle: "Odstránenie účtu",
      delete: "Účet môžete odstrániť priamo v časti <b>Nastavenia → Účet → Odstrániť účet</b> alebo použite <a href=\"./delete-account.html\">stránku so žiadosťou o odstránenie účtu</a>.",
      privacy: "Zásady ochrany súkromia",
    },
    ru: {
      intro: "Это страница поддержки DayRipple — простого способа делиться событиями, годовщинами и задачами с близкими людьми.",
      contact: "Связаться с нами",
      paymentTitle: "Если покупка не завершилась",
      payment: "В приложении нажмите <b>Настройки → Статус оплаты → Проверить незавершённые покупки</b>. Одну и ту же транзакцию магазина нельзя применить к нескольким пространствам.",
      deleteTitle: "Удаление аккаунта",
      delete: "Аккаунт можно удалить прямо в разделе <b>Настройки → Аккаунт → Удалить аккаунт</b> или воспользоваться <a href=\"./delete-account.html\">страницей запроса на удаление аккаунта</a>.",
      privacy: "Политика конфиденциальности",
    },
    hr: {
      intro: "Ovo je stranica podrške za DayRipple — jednostavan način dijeljenja događaja, godišnjica i zadataka s bliskim osobama.",
      contact: "Kontakt",
      paymentTitle: "Ako kupnja nije dovršena",
      payment: "U aplikaciji dodirnite <b>Postavke → Status plaćanja → Provjeri nedovršene kupnje</b>. Ista transakcija iz trgovine ne može se primijeniti na više od jednog prostora.",
      deleteTitle: "Brisanje računa",
      delete: "Račun možete izbrisati izravno u <b>Postavke → Račun → Izbriši račun</b> ili upotrijebite <a href=\"./delete-account.html\">stranicu za zahtjev za brisanje računa</a>.",
      privacy: "Pravila privatnosti",
    },
    sl: {
      intro: "To je stran podpore za DayRipple — preprost način za deljenje dogodkov, obletnic in opravil z bližnjimi.",
      contact: "Stik",
      paymentTitle: "Če nakup ni bil dokončan",
      payment: "V aplikaciji se dotaknite <b>Nastavitve → Stanje plačila → Preveri nedokončane nakupe</b>. Iste transakcije iz trgovine ni mogoče uporabiti za več kot en prostor.",
      deleteTitle: "Brisanje računa",
      delete: "Račun lahko izbrišete neposredno v <b>Nastavitve → Račun → Izbriši račun</b> ali uporabite <a href=\"./delete-account.html\">stran z zahtevo za izbris računa</a>.",
      privacy: "Politika zasebnosti",
    },
    hi: {
      intro: "यह DayRipple का सपोर्ट पेज है — अपने क़रीबी लोगों के साथ इवेंट, सालगिरह और टास्क शेयर करने का आसान तरीक़ा।",
      contact: "संपर्क करें",
      paymentTitle: "अगर ख़रीद पूरी न हुई हो",
      payment: "ऐप में <b>सेटिंग → पेमेंट स्टेटस → अधूरी ख़रीद जाँचें</b> पर टैप करें। एक ही स्टोर ट्रांज़ैक्शन एक से ज़्यादा स्पेस पर लागू नहीं किया जा सकता।",
      deleteTitle: "अकाउंट डिलीट करना",
      delete: "आप अकाउंट सीधे <b>सेटिंग → अकाउंट → अकाउंट डिलीट करें</b> में डिलीट कर सकते हैं, या <a href=\"./delete-account.html\">अकाउंट डिलीट करने के अनुरोध वाला पेज</a> इस्तेमाल करें।",
      privacy: "प्राइवेसी पॉलिसी",
    }
};

  var deleteData = {
    ja: {
      heading: "DayRippleのアカウントとデータを削除する",
      intro: "DayRippleアカウントに紐づくデータを削除する方法をご案内します。",
      instantTitle: "アプリですぐに削除",
      instant: "DayRippleにログインし、<b>設定 → アカウント → アカウントを削除</b>をタップしてください。確認後、削除処理が直ちに開始されます。",
      noAccessTitle: "アプリを利用できない場合",
      noAccess: "登録したメールアドレスから、下のボタンを使って削除をリクエストしてください。パスワードやカード番号は送信しないでください。",
      button: "メールで削除をリクエスト",
      deletedTitle: "削除されるデータ",
      items: ["ログインアカウント、メールアドレス、プロフィール、ニックネーム", "スペースのメンバーシップとプッシュ通知トークン", "端末に残る未完了購入の対象情報、通知予約、分析識別子の状態", "作成した予定、記念日・D-day、やること", "一人で使用していたスペースとそのデータ"],
      retention: "他のメンバーが残っている共有スペースは、残りのメンバーに引き継がれます。法令上保存が必要な決済記録は法定期間中、別途保管される場合があります。また、共有スペースの購入権限は、削除されたアカウントとの紐付けを解除した状態で残ることがあります。アカウントに紐付かない匿名の集計データを、特定のアカウントの情報として再識別することはありません。既存のSentryエラーレポートの削除が必要な場合は、メールにその旨をご記載ください。",
      timing: "メールによるリクエストは本人確認後、速やかに処理し、通常7日以内に完了結果をご連絡します。",
      privacy: "プライバシーポリシー",
      support: "サポート",
    },
    "zh-Hans": {
      heading: "删除 DayRipple 账户和数据",
      intro: "以下是删除与你的 DayRipple 账户关联的数据的方法。",
      instantTitle: "在应用中立即删除",
      instant: "登录 DayRipple 后，依次轻触<b>设置 → 账户 → 删除账户</b>。确认后，删除流程会立即开始。",
      noAccessTitle: "无法使用应用时",
      noAccess: "请使用注册 DayRipple 的邮箱，通过下方按钮发送删除申请。请勿发送密码或支付卡号。",
      button: "通过邮件申请删除",
      deletedTitle: "将被删除的数据",
      items: ["登录账户、邮箱、个人资料和昵称", "空间成员资格和推送通知令牌", "设备上保留的未完成购买目标信息、通知计划和分析标识符状态", "你创建的日程、纪念日／倒数日和待办事项", "你独自使用的空间及其中的数据"],
      retention: "仍有其他成员的共享空间会移交给剩余成员。法律要求保留的付款记录可能会在法定期限内单独保存；共享空间的购买权益也可能在解除与已删除账户的关联后继续保留。已匿名汇总且不与账户关联的产品统计不会被重新识别为特定账户的数据。如需删除已有的 Sentry 错误报告，请在邮件中一并说明。",
      timing: "邮件申请会在完成身份验证后及时处理，通常会在7天内回复处理结果。",
      privacy: "隐私政策",
      support: "帮助",
    },
    "zh-Hant": {
      heading: "刪除 DayRipple 帳號和資料",
      intro: "以下說明如何刪除與 DayRipple 帳號連結的資料。",
      instantTitle: "在應用程式中立即刪除",
      instant: "登入 DayRipple 後，依序點選<b>設定 → 帳號 → 刪除帳號</b>。確認後，刪除程序會立即開始。",
      noAccessTitle: "無法使用應用程式時",
      noAccess: "請使用註冊 DayRipple 的電子郵件，透過下方按鈕寄送刪除申請。請勿傳送密碼或付款卡號。",
      button: "透過電子郵件申請刪除",
      deletedTitle: "將被刪除的資料",
      items: ["登入帳號、電子郵件、個人資料和暱稱", "空間成員資格和推播通知權杖", "裝置上保留的未完成購買目標資訊、通知排程和分析識別碼狀態", "你建立的行程、紀念日／倒數日和待辦事項", "你獨自使用的空間及其中的資料"],
      retention: "仍有其他成員的共享空間會移交給剩餘成員。法律要求保留的付款紀錄可能會在法定期限內另行保存；共享空間的購買權益也可能在解除與已刪除帳號的連結後繼續保留。已匿名彙整且不與帳號連結的產品統計不會被重新識別為特定帳號的資料。如需刪除既有的 Sentry 錯誤報告，請在電子郵件中一併說明。",
      timing: "電子郵件申請會在完成身分驗證後儘速處理，通常會在7天內回覆處理結果。",
      privacy: "隱私權政策",
      support: "支援",
    },
    vi: {
      heading: "Xóa tài khoản và dữ liệu DayRipple",
      intro: "Dưới đây là cách xóa dữ liệu được liên kết với tài khoản DayRipple của bạn.",
      instantTitle: "Xóa ngay trong ứng dụng",
      instant: "Đăng nhập DayRipple rồi nhấn <b>Cài đặt → Tài khoản → Xóa tài khoản</b>. Sau khi bạn xác nhận, quá trình xóa sẽ bắt đầu ngay.",
      noAccessTitle: "Nếu bạn không thể truy cập ứng dụng",
      noAccess: "Hãy dùng địa chỉ email đã đăng ký để gửi yêu cầu xóa bằng nút bên dưới. Không gửi mật khẩu hoặc số thẻ thanh toán.",
      button: "Yêu cầu xóa qua email",
      deletedTitle: "Dữ liệu sẽ bị xóa",
      items: ["Tài khoản đăng nhập, email, hồ sơ và biệt danh", "Tư cách thành viên trong không gian và mã thông báo đẩy", "Thông tin giao dịch chưa hoàn tất còn trên thiết bị, lịch thông báo và trạng thái mã định danh phân tích", "Sự kiện, ngày kỷ niệm／đếm ngược và việc cần làm do bạn tạo", "Không gian bạn dùng một mình và toàn bộ dữ liệu trong đó"],
      retention: "Không gian chung còn thành viên khác sẽ được chuyển cho các thành viên còn lại. Hồ sơ thanh toán phải lưu theo luật có thể được tách riêng và lưu trong thời hạn luật định; quyền mua của không gian chung có thể được giữ lại sau khi gỡ liên kết với tài khoản đã xóa. Số liệu sản phẩm đã được tổng hợp ẩn danh và không liên kết với tài khoản sẽ không được tái định danh thành dữ liệu của một tài khoản cụ thể. Nếu cần xóa báo cáo lỗi Sentry hiện có, hãy ghi rõ trong email.",
      timing: "Yêu cầu qua email được xử lý ngay sau khi xác minh danh tính và thường có kết quả trong vòng 7 ngày.",
      privacy: "Chính sách quyền riêng tư",
      support: "Hỗ trợ",
    },
    es: {
      heading: "Eliminar tu cuenta y tus datos de DayRipple",
      intro: "Aquí se explica cómo eliminar los datos vinculados a tu cuenta de DayRipple.",
      instantTitle: "Eliminación inmediata desde la app",
      instant: "Inicia sesión en DayRipple y toca <b>Ajustes → Cuenta → Eliminar cuenta</b>. Tras confirmar, la eliminación comenzará de inmediato.",
      noAccessTitle: "Si no puedes acceder a la app",
      noAccess: "Envía la solicitud desde el correo con el que te registraste mediante el botón de abajo. No envíes tu contraseña ni el número de tu tarjeta.",
      button: "Solicitar la eliminación por correo",
      deletedTitle: "Datos que se eliminan",
      items: ["Cuenta de acceso, correo electrónico, perfil y apodo", "Pertenencia a espacios y tokens de notificaciones push", "Información de compras pendientes guardada en el dispositivo, notificaciones programadas y estado del identificador de análisis", "Planes, aniversarios／D-days y tareas que hayas creado", "Espacios que utilizabas en solitario y sus datos"],
      retention: "Los espacios compartidos en los que queden otros miembros se transferirán a esas personas. Los registros de pago que deban conservarse por ley podrán guardarse por separado durante el plazo legal; los derechos de compra de un espacio compartido podrán mantenerse una vez eliminada su vinculación con la cuenta borrada. Las estadísticas agregadas de forma anónima y no vinculadas a una cuenta no se volverán a identificar como datos de una cuenta concreta. Si necesitas eliminar informes de errores existentes en Sentry, indícalo en el correo.",
      timing: "Las solicitudes por correo se tramitan sin demora tras verificar la identidad y normalmente se completan en un plazo de 7 días.",
      privacy: "Política de privacidad",
      support: "Ayuda",
    },
    "pt-BR": {
      heading: "Excluir sua conta e seus dados do DayRipple",
      intro: "Veja como excluir os dados vinculados à sua conta do DayRipple.",
      instantTitle: "Exclusão imediata pelo app",
      instant: "Entre no DayRipple e toque em <b>Ajustes → Conta → Excluir conta</b>. Depois da confirmação, a exclusão começa imediatamente.",
      noAccessTitle: "Se você não consegue acessar o app",
      noAccess: "Envie a solicitação pelo email usado no cadastro, usando o botão abaixo. Não envie sua senha nem o número do cartão.",
      button: "Solicitar exclusão por email",
      deletedTitle: "Dados excluídos",
      items: ["Conta de acesso, email, perfil e apelido", "Participação em espaços e tokens de notificações push", "Informações de compras pendentes no dispositivo, notificações agendadas e estado do identificador de análise", "Eventos, datas especiais／D-days e tarefas que você criou", "Espaços usados somente por você e os dados deles"],
      retention: "Espaços compartilhados que ainda tenham outros membros serão transferidos para essas pessoas. Registros de pagamento cuja retenção seja exigida por lei poderão ser armazenados separadamente pelo prazo legal; os direitos de compra de um espaço compartilhado poderão permanecer após a remoção do vínculo com a conta excluída. Estatísticas agregadas de forma anônima e sem vínculo com a conta não serão reidentificadas como dados de uma conta específica. Se precisar excluir relatórios de erro já existentes no Sentry, informe isso no email.",
      timing: "As solicitações por email são processadas sem demora após a confirmação da identidade e normalmente são concluídas em até 7 dias.",
      privacy: "Política de Privacidade",
      support: "Ajuda",
    },
    de: {
      heading: "DayRipple-Konto und zugehörige Daten löschen",
      intro: "So löschst du die Daten, die mit deinem DayRipple-Konto verknüpft sind.",
      instantTitle: "Direkt in der App löschen",
      instant: "Melde dich bei DayRipple an und tippe auf <b>Einstellungen → Konto → Konto löschen</b>. Nach deiner Bestätigung beginnt die Löschung sofort.",
      noAccessTitle: "Wenn du keinen Zugriff auf die App hast",
      noAccess: "Sende den Löschantrag über die bei der Registrierung verwendete E-Mail-Adresse mit der Schaltfläche unten. Sende weder dein Passwort noch deine Kartennummer.",
      button: "Löschung per E-Mail beantragen",
      deletedTitle: "Diese Daten werden gelöscht",
      items: ["Anmeldekonto, E-Mail-Adresse, Profil und Anzeigename", "Bereichsmitgliedschaften und Push-Tokens", "Auf dem Gerät gespeicherte Angaben zu ausstehenden Käufen, geplante Benachrichtigungen und Status der Analysekennung", "Von dir erstellte Termine, Jahrestage／D-Days und Aufgaben", "Allein genutzte Bereiche und deren Daten"],
      retention: "Geteilte Bereiche, in denen weitere Mitglieder verbleiben, werden auf diese Personen übertragen. Zahlungsnachweise, die gesetzlich aufbewahrt werden müssen, können für die vorgeschriebene Dauer getrennt gespeichert werden; Kaufberechtigungen eines geteilten Bereichs können nach Entfernung der Verknüpfung mit dem gelöschten Konto bestehen bleiben. Anonym zusammengefasste, nicht mit einem Konto verknüpfte Produktstatistiken werden keinem bestimmten Konto nachträglich zugeordnet. Wenn bestehende Sentry-Fehlerberichte gelöscht werden sollen, erwähne dies bitte in der E-Mail.",
      timing: "E-Mail-Anträge werden nach der Identitätsprüfung unverzüglich bearbeitet und in der Regel innerhalb von 7 Tagen abgeschlossen.",
      privacy: "Datenschutzerklärung",
      support: "Support",
    },
    fr: {
      heading: "Supprimer votre compte DayRipple et vos données",
      intro: "Voici comment supprimer les données associées à votre compte DayRipple.",
      instantTitle: "Suppression immédiate dans l’app",
      instant: "Connectez-vous à DayRipple, puis touchez <b>Réglages → Compte → Supprimer le compte</b>. Après confirmation, la suppression commence immédiatement.",
      noAccessTitle: "Si vous ne pouvez pas accéder à l’app",
      noAccess: "Envoyez la demande depuis l’adresse e-mail utilisée lors de l’inscription à l’aide du bouton ci-dessous. N’envoyez ni mot de passe ni numéro de carte bancaire.",
      button: "Demander la suppression par e-mail",
      deletedTitle: "Données supprimées",
      items: ["Compte de connexion, adresse e-mail, profil et pseudonyme", "Appartenance aux espaces et jetons de notification push", "Informations d’achats en attente conservées sur l’appareil, notifications programmées et état de l’identifiant d’analyse", "Événements, anniversaires／Jours J et tâches que vous avez créés", "Espaces utilisés seul et leurs données"],
      retention: "Les espaces partagés dans lesquels restent d’autres membres leur sont transférés. Les justificatifs de paiement dont la conservation est imposée par la loi peuvent être stockés séparément pendant la durée légale ; les droits d’achat d’un espace partagé peuvent subsister après suppression du lien avec le compte effacé. Les statistiques produit agrégées de façon anonyme et non liées à un compte ne sont pas réidentifiées comme les données d’un compte précis. Si vous souhaitez supprimer des rapports d’erreur Sentry existants, précisez-le dans votre e-mail.",
      timing: "Les demandes par e-mail sont traitées rapidement après vérification de l’identité et aboutissent généralement sous 7 jours.",
      privacy: "Politique de confidentialité",
      support: "Assistance",
    },
    id: {
      heading: "Hapus akun dan data DayRipple",
      intro: "Berikut cara menghapus data yang terhubung dengan akun DayRipple kamu.",
      instantTitle: "Hapus langsung dari aplikasi",
      instant: "Masuk ke DayRipple lalu ketuk <b>Pengaturan → Akun → Hapus akun</b>. Setelah dikonfirmasi, proses penghapusan langsung dimulai.",
      noAccessTitle: "Jika kamu tidak dapat mengakses aplikasi",
      noAccess: "Kirim permintaan dari alamat email yang digunakan untuk mendaftar melalui tombol di bawah. Jangan kirim kata sandi atau nomor kartu pembayaran.",
      button: "Minta penghapusan lewat email",
      deletedTitle: "Data yang dihapus",
      items: ["Akun masuk, email, profil, dan nama panggilan", "Keanggotaan ruang dan token notifikasi push", "Informasi pembelian tertunda di perangkat, jadwal notifikasi, dan status pengenal analitik", "Jadwal, hari jadi／Hari-H, dan tugas yang kamu buat", "Ruang yang kamu gunakan sendiri beserta datanya"],
      retention: "Ruang bersama yang masih memiliki anggota lain akan dialihkan kepada anggota yang tersisa. Catatan pembayaran yang wajib disimpan menurut hukum dapat disimpan terpisah selama jangka waktu yang ditetapkan; hak pembelian ruang bersama dapat tetap berlaku setelah kaitannya dengan akun yang dihapus dilepas. Statistik produk yang telah digabungkan secara anonim dan tidak terhubung ke akun tidak akan diidentifikasi ulang sebagai data akun tertentu. Jika laporan kesalahan Sentry yang sudah ada perlu dihapus, tuliskan permintaan tersebut di email.",
      timing: "Permintaan melalui email diproses segera setelah verifikasi identitas dan biasanya selesai dalam 7 hari.",
      privacy: "Kebijakan Privasi",
      support: "Bantuan",
    },
    it: {
      heading: "Eliminare l'account DayRipple e i dati collegati",
      intro: "Ecco come eliminare i dati collegati al tuo account DayRipple.",
      instantTitle: "Eliminare direttamente nell'app",
      instant: "Accedi a DayRipple e tocca <b>Impostazioni → Account → Elimina account</b>. Dopo la conferma l'eliminazione parte subito.",
      noAccessTitle: "Se non riesci ad accedere all'app",
      noAccess: "Invia la richiesta di eliminazione dall'indirizzo email usato in fase di registrazione con il pulsante qui sotto. Non inviare la password né il numero della carta.",
      button: "Richiedi l'eliminazione via email",
      deletedTitle: "Questi dati vengono eliminati",
      items: ["Account di accesso, indirizzo email, profilo e nome visualizzato", "Appartenenze agli spazi e token di notifica push", "Dati sugli acquisti in sospeso salvati sul dispositivo, notifiche programmate e stato dell'identificatore di analisi", "Eventi, anniversari／D-day e cose da fare che hai creato", "Spazi usati da solo e i loro dati"],
      retention: "Gli spazi condivisi in cui restano altri membri vengono trasferiti a queste persone. Le prove di pagamento che devono essere conservate per legge possono essere archiviate separatamente per la durata prevista; i diritti d'acquisto di uno spazio condiviso possono restare validi dopo la rimozione del collegamento con l'account eliminato. Le statistiche di prodotto aggregate in forma anonima e non collegate a un account non vengono riassociate a posteriori a un account specifico. Se desideri che vengano eliminati anche i report di errore Sentry esistenti, indicalo nell'email.",
      timing: "Le richieste via email vengono elaborate subito dopo la verifica dell'identità e di norma completate entro 7 giorni.",
      privacy: "Informativa sulla privacy",
      support: "Assistenza",
    },
    nl: {
      heading: "DayRipple-account en bijbehorende gegevens verwijderen",
      intro: "Zo verwijder je de gegevens die aan je DayRipple-account gekoppeld zijn.",
      instantTitle: "Direct in de app verwijderen",
      instant: "Log in bij DayRipple en tik op <b>Instellingen → Account → Account verwijderen</b>. Na je bevestiging begint het verwijderen meteen.",
      noAccessTitle: "Als je geen toegang tot de app hebt",
      noAccess: "Stuur het verwijderingsverzoek vanaf het e-mailadres waarmee je je hebt geregistreerd via de knop hieronder. Stuur nooit je wachtwoord of kaartnummer mee.",
      button: "Verwijdering per e-mail aanvragen",
      deletedTitle: "Deze gegevens worden verwijderd",
      items: ["Inlogaccount, e-mailadres, profiel en weergavenaam", "Lidmaatschappen van ruimtes en pushtokens", "Op het apparaat opgeslagen gegevens over openstaande aankopen, geplande meldingen en de status van de analyse-identificatie", "Afspraken, jubilea／D-days en taken die je hebt gemaakt", "Ruimtes die je alleen gebruikte en hun gegevens"],
      retention: "Gedeelde ruimtes waarin andere leden achterblijven, worden aan die personen overgedragen. Betaalbewijzen die wettelijk bewaard moeten blijven, kunnen gedurende de voorgeschreven termijn apart worden opgeslagen; aankooprechten van een gedeelde ruimte kunnen blijven bestaan nadat de koppeling met het verwijderde account is weggehaald. Anoniem samengevoegde productstatistieken die niet aan een account gekoppeld zijn, worden achteraf niet aan een specifiek account toegewezen. Wil je dat bestaande Sentry-foutrapporten ook worden verwijderd, vermeld dat dan in de e-mail.",
      timing: "E-mailverzoeken worden na identiteitscontrole direct verwerkt en meestal binnen 7 dagen afgerond.",
      privacy: "Privacybeleid",
      support: "Ondersteuning",
    },
    th: {
      heading: "ลบบัญชี DayRipple และข้อมูลที่เกี่ยวข้อง",
      intro: "วิธีลบข้อมูลที่เชื่อมโยงกับบัญชี DayRipple ของคุณ",
      instantTitle: "ลบโดยตรงในแอป",
      instant: "เข้าสู่ระบบ DayRipple แล้วแตะ <b>ตั้งค่า → บัญชี → ลบบัญชี</b> หลังยืนยันแล้วการลบจะเริ่มทันที",
      noAccessTitle: "หากคุณเข้าใช้แอปไม่ได้",
      noAccess: "ส่งคำขอลบจากอีเมลที่ใช้สมัครโดยกดปุ่มด้านล่าง อย่าส่งรหัสผ่านหรือหมายเลขบัตรมาด้วย",
      button: "ขอลบบัญชีทางอีเมล",
      deletedTitle: "ข้อมูลเหล่านี้จะถูกลบ",
      items: ["บัญชีเข้าสู่ระบบ อีเมล โปรไฟล์ และชื่อที่แสดง", "การเป็นสมาชิกพื้นที่และโทเค็นการแจ้งเตือน", "ข้อมูลการซื้อที่ค้างอยู่ซึ่งเก็บบนเครื่อง การแจ้งเตือนที่ตั้งเวลาไว้ และสถานะตัวระบุสำหรับการวิเคราะห์", "กิจกรรม วันครบรอบ／D-day และสิ่งที่ต้องทำที่คุณสร้างไว้", "พื้นที่ที่คุณใช้คนเดียวและข้อมูลในนั้น"],
      retention: "พื้นที่ที่แชร์ร่วมกันและยังมีสมาชิกคนอื่นเหลืออยู่จะถูกโอนให้บุคคลเหล่านั้น หลักฐานการชำระเงินที่ต้องเก็บตามกฎหมายอาจถูกจัดเก็บแยกไว้ตามระยะเวลาที่กำหนด สิทธิ์การซื้อของพื้นที่ที่แชร์อาจยังคงอยู่หลังจากตัดการเชื่อมโยงกับบัญชีที่ถูกลบแล้ว สถิติการใช้งานแบบไม่ระบุตัวตนที่ไม่ได้เชื่อมกับบัญชีจะไม่ถูกนำกลับมาเชื่อมโยงกับบัญชีใดในภายหลัง หากต้องการให้ลบรายงานข้อผิดพลาดของ Sentry ที่มีอยู่ด้วย โปรดระบุในอีเมล",
      timing: "คำขอทางอีเมลจะดำเนินการทันทีหลังตรวจสอบตัวตน และโดยทั่วไปเสร็จสิ้นภายใน 7 วัน",
      privacy: "นโยบายความเป็นส่วนตัว",
      support: "ความช่วยเหลือ",
    },
    tr: {
      heading: "DayRipple hesabını ve ilgili verileri sil",
      intro: "DayRipple hesabına bağlı verileri şöyle silebilirsin.",
      instantTitle: "Doğrudan uygulamada silme",
      instant: "DayRipple'a giriş yap ve <b>Ayarlar → Hesap → Hesabı sil</b> seçeneğine dokun. Onayından sonra silme işlemi hemen başlar.",
      noAccessTitle: "Uygulamaya erişemiyorsan",
      noAccess: "Silme talebini kayıt sırasında kullandığın e-posta adresinden aşağıdaki düğmeyle gönder. Şifreni veya kart numaranı gönderme.",
      button: "E-posta ile silme talebi gönder",
      deletedTitle: "Şu veriler silinir",
      items: ["Giriş hesabı, e-posta adresi, profil ve görünen ad", "Alan üyelikleri ve bildirim jetonları", "Cihazda saklanan tamamlanmamış satın alma bilgileri, planlanmış bildirimler ve analiz tanımlayıcısının durumu", "Oluşturduğun etkinlikler, yıldönümleri／D-day'ler ve yapılacak işler", "Tek başına kullandığın alanlar ve içindeki veriler"],
      retention: "Başka üyelerin kaldığı paylaşılan alanlar bu kişilere devredilir. Yasal olarak saklanması gereken ödeme kayıtları öngörülen süre boyunca ayrı olarak saklanabilir; paylaşılan bir alanın satın alma hakları, silinen hesapla bağlantısı kaldırıldıktan sonra da geçerli kalabilir. Bir hesaba bağlı olmayan, anonim olarak toplanmış ürün istatistikleri sonradan belirli bir hesapla ilişkilendirilmez. Mevcut Sentry hata raporlarının da silinmesini istiyorsan bunu e-postada belirt.",
      timing: "E-posta talepleri kimlik doğrulamasının ardından hemen işleme alınır ve genellikle 7 gün içinde tamamlanır.",
      privacy: "Gizlilik Politikası",
      support: "Destek",
    },
    pl: {
      heading: "Usuń konto i dane DayRipple", intro: "Poniżej wyjaśniamy, jak usunąć dane powiązane z kontem DayRipple.",
      instantTitle: "Natychmiastowe usunięcie w aplikacji", instant: "Zaloguj się do DayRipple i wybierz <b>Ustawienia → Konto → Usuń konto</b>. Po potwierdzeniu proces usuwania rozpocznie się natychmiast.",
      noAccessTitle: "Jeśli nie masz dostępu do aplikacji", noAccess: "Wyślij żądanie usunięcia z adresu e-mail użytego podczas rejestracji, korzystając z przycisku poniżej. Nie podawaj hasła ani numeru karty płatniczej.", button: "Poproś o usunięcie przez e-mail", deletedTitle: "Usuwane dane",
      items: ["Konto logowania, adres e-mail, profil i pseudonim", "Członkostwa w przestrzeniach i tokeny powiadomień push", "Zapisane na urządzeniu informacje dotyczące niedokończonych zakupów, zaplanowane powiadomienia i stan identyfikatora analitycznego", "Utworzone przez Ciebie wydarzenia, rocznice／D-day i zadania", "Przestrzenie używane wyłącznie przez Ciebie wraz z ich danymi"],
      retention: "Współdzielone przestrzenie, w których pozostają inni członkowie, zostaną im przekazane. Dokumentacja płatności, której przechowywania wymaga prawo, może być przechowywana oddzielnie przez ustawowy okres; uprawnienie zakupowe współdzielonej przestrzeni może pozostać po usunięciu powiązania z usuniętym kontem. Anonimowe, zagregowane statystyki produktu niepowiązane z kontem nie będą ponownie identyfikowane jako dane konkretnego konta. Jeśli chcesz usunąć istniejące raporty błędów Sentry, zaznacz to w wiadomości e-mail.",
      timing: "Żądania przesłane e-mailem są rozpatrywane niezwłocznie po weryfikacji tożsamości, zwykle w ciągu 7 dni.", privacy: "Polityka prywatności", support: "Pomoc",
    },
    ro: {
      heading: "Șterge contul și datele DayRipple", intro: "Iată cum poți șterge datele asociate contului tău DayRipple.",
      instantTitle: "Ștergere imediată din aplicație", instant: "Autentifică-te în DayRipple, apoi atinge <b>Setări → Cont → Șterge contul</b>. După confirmare, ștergerea începe imediat.",
      noAccessTitle: "Dacă nu poți accesa aplicația", noAccess: "Trimite solicitarea de la adresa de e-mail folosită la înregistrare, utilizând butonul de mai jos. Nu trimite parola sau numărul cardului de plată.", button: "Solicită ștergerea prin e-mail", deletedTitle: "Datele care se șterg",
      items: ["Contul de autentificare, adresa de e-mail, profilul și pseudonimul", "Calitatea de membru al spațiilor și tokenurile pentru notificări push", "Informațiile despre achizițiile nefinalizate păstrate pe dispozitiv, notificările programate și starea identificatorului de analiză", "Evenimentele, aniversările／zilele D și sarcinile create de tine", "Spațiile folosite numai de tine și datele acestora"],
      retention: "Spațiile partajate în care rămân alți membri vor fi transferate acestora. Evidențele de plată care trebuie păstrate potrivit legii pot fi stocate separat pe durata legală; dreptul de achiziție al unui spațiu partajat poate rămâne după eliminarea legăturii cu contul șters. Statisticile anonime, agregate și neasociate unui cont nu vor fi reidentificate ca date ale unui anumit cont. Dacă dorești ștergerea rapoartelor de eroare Sentry existente, menționează acest lucru în e-mail.",
      timing: "Solicitările prin e-mail sunt prelucrate prompt după verificarea identității și, de regulă, sunt finalizate în 7 zile.", privacy: "Politica de confidențialitate", support: "Asistență",
    },
    cs: {
      heading: "Smazání účtu a dat DayRipple", intro: "Zde je postup, jak smazat data spojená s vaším účtem DayRipple.",
      instantTitle: "Okamžité smazání v aplikaci", instant: "Přihlaste se do DayRipple a klepněte na <b>Nastavení → Účet → Smazat účet</b>. Po potvrzení začne mazání okamžitě.",
      noAccessTitle: "Pokud nemáte přístup k aplikaci", noAccess: "Odešlete žádost z e-mailové adresy použité při registraci pomocí tlačítka níže. Neposílejte heslo ani číslo platební karty.", button: "Požádat o smazání e-mailem", deletedTitle: "Data, která budou smazána",
      items: ["Přihlašovací účet, e-mailová adresa, profil a přezdívka", "Členství v prostorech a tokeny push oznámení", "Informace o nedokončených nákupech uložené v zařízení, naplánovaná oznámení a stav analytického identifikátoru", "Události, výročí／D-day a úkoly, které jste vytvořili", "Prostory používané pouze vámi a jejich data"],
      retention: "Sdílené prostory, v nichž zůstávají další členové, budou převedeny na tyto členy. Platební záznamy, které musí být uchovávány ze zákona, mohou být po zákonnou dobu uloženy odděleně; nákupní oprávnění sdíleného prostoru může zůstat zachováno po odstranění vazby na smazaný účet. Anonymní souhrnné statistiky produktu bez vazby na účet nebudou znovu identifikovány jako data konkrétního účtu. Pokud potřebujete smazat existující chybová hlášení Sentry, uveďte to v e-mailu.",
      timing: "E-mailové žádosti zpracujeme bezodkladně po ověření totožnosti, obvykle do 7 dnů.", privacy: "Zásady ochrany osobních údajů", support: "Podpora",
    },
    ms: {
      heading: "Padam akaun dan data DayRipple anda", intro: "Berikut ialah cara memadam data yang dipautkan kepada akaun DayRipple anda.",
      instantTitle: "Padam serta-merta dalam aplikasi", instant: "Log masuk ke DayRipple, kemudian ketik <b>Tetapan → Akaun → Padam akaun</b>. Selepas anda mengesahkan, pemadaman bermula serta-merta.",
      noAccessTitle: "Jika anda tidak dapat mengakses aplikasi", noAccess: "Hantar permintaan pemadaman daripada alamat e-mel yang digunakan semasa mendaftar melalui butang di bawah. Jangan hantar kata laluan atau nombor kad pembayaran anda.", button: "Minta pemadaman melalui e-mel", deletedTitle: "Data yang dipadam",
      items: ["Akaun log masuk, e-mel, profil dan nama panggilan", "Keahlian ruang dan token pemberitahuan push", "Maklumat sasaran pembelian belum selesai pada peranti, pemberitahuan berjadual dan status pengecam analitik", "Acara, ulang tahun／D-day dan tugasan yang anda cipta", "Ruang yang anda gunakan bersendirian serta datanya"],
      retention: "Ruang kongsi yang masih mempunyai ahli lain akan dipindahkan kepada ahli tersebut. Rekod pembayaran yang wajib disimpan oleh undang-undang boleh disimpan secara berasingan sepanjang tempoh berkanun; kelayakan pembelian ruang kongsi boleh kekal selepas pautannya kepada akaun yang dipadam dibuang. Statistik produk tanpa nama yang diagregatkan tanpa pautan akaun tidak akan dikenal pasti semula sebagai data akaun tertentu. Jika anda mahu laporan ralat Sentry sedia ada dipadam, nyatakan perkara itu dalam e-mel anda.",
      timing: "Permintaan melalui e-mel diproses dengan segera selepas pengesahan identiti dan biasanya diselesaikan dalam tempoh 7 hari.", privacy: "Dasar Privasi", support: "Sokongan",
    },
    el: {
      heading: "Διαγραφή λογαριασμού και δεδομένων DayRipple", intro: "Δείτε πώς μπορείτε να διαγράψετε τα δεδομένα που συνδέονται με τον λογαριασμό σας στο DayRipple.",
      instantTitle: "Άμεση διαγραφή στην εφαρμογή", instant: "Συνδεθείτε στο DayRipple και πατήστε <b>Ρυθμίσεις → Λογαριασμός → Διαγραφή λογαριασμού</b>. Μετά την επιβεβαίωση, η διαγραφή ξεκινά αμέσως.",
      noAccessTitle: "Αν δεν μπορείτε να αποκτήσετε πρόσβαση στην εφαρμογή", noAccess: "Στείλτε αίτημα διαγραφής από τη διεύθυνση email με την οποία εγγραφήκατε, χρησιμοποιώντας το παρακάτω κουμπί. Μην στείλετε τον κωδικό πρόσβασης ή τον αριθμό της κάρτας πληρωμής σας.", button: "Αίτημα διαγραφής μέσω email", deletedTitle: "Δεδομένα που διαγράφονται",
      items: ["Λογαριασμός σύνδεσης, email, προφίλ και ψευδώνυμο", "Συμμετοχές σε χώρους και διακριτικά ειδοποιήσεων push", "Πληροφορίες εκκρεμών αγορών στη συσκευή, προγραμματισμένες ειδοποιήσεις και κατάσταση αναγνωριστικού αναλυτικών στοιχείων", "Εκδηλώσεις, επέτειοι／D-day και εργασίες που δημιουργήσατε", "Χώροι που χρησιμοποιούσατε μόνοι σας και τα δεδομένα τους"],
      retention: "Οι κοινόχρηστοι χώροι στους οποίους παραμένουν άλλα μέλη μεταβιβάζονται σε αυτά. Τα αρχεία πληρωμών που πρέπει να διατηρούνται βάσει νόμου μπορεί να αποθηκεύονται χωριστά για τη νόμιμη περίοδο· το δικαίωμα αγοράς ενός κοινόχρηστου χώρου μπορεί να παραμείνει αφού αφαιρεθεί η σύνδεσή του με τον διαγραμμένο λογαριασμό. Τα ανώνυμα συγκεντρωτικά στατιστικά προϊόντος που δεν συνδέονται με λογαριασμό δεν επαναταυτοποιούνται ως δεδομένα συγκεκριμένου λογαριασμού. Αν χρειάζεστε διαγραφή υπαρχουσών αναφορών σφαλμάτων Sentry, αναφέρετέ το στο email σας.",
      timing: "Τα αιτήματα μέσω email διεκπεραιώνονται άμεσα μετά την επαλήθευση ταυτότητας και συνήθως ολοκληρώνονται εντός 7 ημερών.", privacy: "Πολιτική απορρήτου", support: "Υποστήριξη",
    },
    hu: {
      heading: "DayRipple-fiók és -adatok törlése", intro: "Így törölheted a DayRipple-fiókodhoz kapcsolódó adatokat.",
      instantTitle: "Azonnali törlés az alkalmazásban", instant: "Jelentkezz be a DayRipple-ba, majd koppints a <b>Beállítások → Fiók → Fiók törlése</b> lehetőségre. A megerősítés után a törlés azonnal megkezdődik.",
      noAccessTitle: "Ha nem férsz hozzá az alkalmazáshoz", noAccess: "Az alábbi gombbal, a regisztrációhoz használt e-mail-címről küldd el a törlési kérelmet. Ne küldd el a jelszavadat vagy a bankkártyaszámodat.", button: "Törlés kérése e-mailben", deletedTitle: "Törölt adatok",
      items: ["Bejelentkezési fiók, e-mail-cím, profil és becenév", "Tértagságok és pushértesítési tokenek", "Az eszközön tárolt, befejezetlen vásárlások céladatai, ütemezett értesítések és az analitikai azonosító állapota", "Az általad létrehozott események, évfordulók／D-dayek és teendők", "A kizárólag általad használt terek és azok adatai"],
      retention: "Azokat a megosztott tereket, amelyekben más tagok maradnak, átadjuk a fennmaradó tagoknak. A jogszabály alapján megőrzendő fizetési nyilvántartásokat a törvényes időtartamra elkülönítve tárolhatjuk; egy megosztott tér vásárlási jogosultsága megmaradhat, miután megszüntettük a kapcsolatát a törölt fiókkal. A fiókhoz nem kapcsolt, névtelenül összesített termékstatisztikákat nem azonosítjuk újra egy adott fiók adataiként. Ha meglévő Sentry-hibajelentéseket is töröltetnél, írd bele az e-mailbe.",
      timing: "Az e-mailben küldött kérelmeket a személyazonosság ellenőrzése után haladéktalanul feldolgozzuk, és rendszerint 7 napon belül lezárjuk.", privacy: "Adatvédelmi szabályzat", support: "Támogatás",
    },
    "pt-PT": {
      heading: "Eliminar a sua conta e os seus dados DayRipple", intro: "Saiba como eliminar os dados associados à sua conta DayRipple.",
      instantTitle: "Eliminação imediata na aplicação", instant: "Inicie sessão no DayRipple e toque em <b>Definições → Conta → Eliminar conta</b>. Após a confirmação, a eliminação começa imediatamente.",
      noAccessTitle: "Se não conseguir aceder à aplicação", noAccess: "Envie o pedido a partir do endereço de e-mail utilizado no registo através do botão abaixo. Não envie a sua palavra-passe nem o número do cartão de pagamento.", button: "Pedir eliminação por e-mail", deletedTitle: "Dados eliminados",
      items: ["Conta de acesso, endereço de e-mail, perfil e alcunha", "Participações em espaços e tokens de notificações push", "Informações de compras pendentes guardadas no dispositivo, notificações agendadas e estado do identificador de análise", "Eventos, aniversários／dias D e tarefas que criou", "Espaços que utilizava sozinho e respetivos dados"],
      retention: "Os espaços partilhados onde permaneçam outros membros serão transferidos para essas pessoas. Os registos de pagamento cuja conservação seja exigida por lei podem ser armazenados separadamente durante o prazo legal; o direito de compra de um espaço partilhado pode manter-se depois de removida a associação à conta eliminada. As estatísticas anónimas e agregadas do produto que não estejam associadas a uma conta não serão reidentificadas como dados de uma conta específica. Se precisar de eliminar relatórios de erros Sentry existentes, indique-o no e-mail.",
      timing: "Os pedidos por e-mail são tratados prontamente após a verificação da identidade e, em regra, ficam concluídos no prazo de 7 dias.", privacy: "Política de Privacidade", support: "Suporte",
    },
    uk: {
      heading: "Видалення облікового запису та даних DayRipple", intro: "Ось як видалити дані, пов’язані з вашим обліковим записом DayRipple.",
      instantTitle: "Негайне видалення в застосунку", instant: "Увійдіть у DayRipple і натисніть <b>Налаштування → Обліковий запис → Видалити обліковий запис</b>. Після підтвердження видалення розпочнеться негайно.",
      noAccessTitle: "Якщо ви не маєте доступу до застосунку", noAccess: "Надішліть запит з адреси електронної пошти, яку використовували для реєстрації, за допомогою кнопки нижче. Не надсилайте пароль або номер платіжної картки.", button: "Надіслати запит на видалення електронною поштою", deletedTitle: "Дані, які буде видалено",
      items: ["Обліковий запис для входу, електронна пошта, профіль і псевдонім", "Участь у просторах і токени push-сповіщень", "Збережена на пристрої інформація про незавершені покупки, заплановані сповіщення та стан аналітичного ідентифікатора", "Створені вами події, річниці／D-day і завдання", "Простори, якими користувалися лише ви, та їхні дані"],
      retention: "Спільні простори, у яких залишилися інші учасники, буде передано цим учасникам. Платіжні записи, які закон зобов’язує зберігати, можуть зберігатися окремо протягом установленого законом строку; право покупки спільного простору може залишитися після вилучення його зв’язку з видаленим обліковим записом. Анонімна агрегована статистика продукту, не пов’язана з обліковим записом, не буде повторно ідентифікована як дані конкретного облікового запису. Якщо потрібно видалити наявні звіти про помилки Sentry, зазначте це в листі.",
      timing: "Запити електронною поштою обробляються без зволікань після перевірки особи й зазвичай виконуються протягом 7 днів.", privacy: "Політика конфіденційності", support: "Підтримка",
    },
    fil: {
      heading: "I-delete ang iyong DayRipple account at data", intro: "Narito kung paano i-delete ang data na naka-link sa iyong DayRipple account.",
      instantTitle: "I-delete agad sa app", instant: "Mag-sign in sa DayRipple, pagkatapos ay i-tap ang <b>Mga Setting → Account → I-delete ang account</b>. Pagkatapos mong kumpirmahin, magsisimula agad ang pag-delete.",
      noAccessTitle: "Kung hindi mo ma-access ang app", noAccess: "Gamit ang button sa ibaba, ipadala ang kahilingan sa pag-delete mula sa email address na ginamit mo sa pag-sign up. Huwag ipadala ang iyong password o numero ng payment card.", button: "Humiling ng pag-delete sa email", deletedTitle: "Data na dini-delete",
      items: ["Login account, email, profile, at palayaw", "Mga membership sa space at mga push notification token", "Impormasyon sa device tungkol sa hindi natapos na pagbili, mga naka-iskedyul na notification, at estado ng analytics identifier", "Mga event, anibersaryo／D-day, at gawaing ginawa mo", "Mga space na ikaw lamang ang gumamit at ang data ng mga iyon"],
      retention: "Ang mga shared space na may iba pang natitirang miyembro ay ililipat sa mga miyembrong iyon. Ang mga rekord ng pagbabayad na kailangang panatilihin ayon sa batas ay maaaring hiwalay na itago sa panahon na itinakda ng batas; maaaring manatili ang purchase entitlement ng isang shared space matapos alisin ang link nito sa na-delete na account. Ang anonymous at pinagsama-samang product statistics na walang link sa account ay hindi muling tutukuyin bilang data ng isang partikular na account. Kung kailangan mong ipabura ang mga kasalukuyang Sentry error report, sabihin ito sa iyong email.",
      timing: "Agad na pinoproseso ang mga kahilingan sa email matapos ma-verify ang pagkakakilanlan at karaniwang natatapos sa loob ng 7 araw.", privacy: "Patakaran sa Privacy", support: "Suporta",
    },
    sv: {
      heading: "Ta bort ditt DayRipple-konto och dina data", intro: "Så här tar du bort data som är kopplade till ditt DayRipple-konto.",
      instantTitle: "Radera direkt i appen", instant: "Logga in på DayRipple och tryck på <b>Inställningar → Konto → Radera konto</b>. När du har bekräftat börjar raderingen omedelbart.",
      noAccessTitle: "Om du inte kan komma åt appen", noAccess: "Skicka begäran från e-postadressen du registrerade dig med via knappen nedan. Skicka inte ditt lösenord eller betalkortsnummer.", button: "Begär radering via e-post", deletedTitle: "Data som raderas",
      items: ["Inloggningskonto, e-postadress, profil och smeknamn", "Medlemskap i utrymmen och token för pushnotiser", "Information om oavslutade köp som finns på enheten, schemalagda notiser och status för analysidentifieraren", "Händelser, årsdagar／D-dagar och uppgifter som du har skapat", "Utrymmen som bara du använde och deras data"],
      retention: "Delade utrymmen där andra medlemmar finns kvar överförs till dem. Betalningsuppgifter som enligt lag måste sparas kan lagras separat under den lagstadgade tiden; ett delat utrymmes köprättighet kan finnas kvar när kopplingen till det raderade kontot har tagits bort. Anonym, aggregerad produktstatistik utan kontokoppling återidentifieras inte som data för ett visst konto. Om du behöver få befintliga Sentry-felrapporter raderade ska du ange det i e-postmeddelandet.",
      timing: "Begäranden via e-post behandlas utan dröjsmål efter identitetskontroll och slutförs normalt inom 7 dagar.", privacy: "Integritetspolicy", support: "Support",
    },
    da: {
      heading: "Slet din DayRipple-konto og dine data", intro: "Sådan sletter du de data, der er knyttet til din DayRipple-konto.",
      instantTitle: "Slet med det samme i appen", instant: "Log ind på DayRipple, og tryk derefter på <b>Indstillinger → Konto → Slet konto</b>. Når du har bekræftet, begynder sletningen med det samme.",
      noAccessTitle: "Hvis du ikke kan få adgang til appen", noAccess: "Send anmodningen fra den e-mailadresse, du tilmeldte dig med, via knappen nedenfor. Send ikke din adgangskode eller dit betalingskortnummer.", button: "Anmod om sletning via e-mail", deletedTitle: "Data, der slettes",
      items: ["Loginkonto, e-mailadresse, profil og kaldenavn", "Medlemskaber af rum og tokens til pushnotifikationer", "Oplysninger om uafsluttede køb på enheden, planlagte notifikationer og analyseidentifikatorens status", "Begivenheder, mærkedage／D-dage og opgaver, du har oprettet", "Rum, som kun du brugte, og deres data"],
      retention: "Delte rum, hvor der er andre medlemmer tilbage, overføres til dem. Betalingsoplysninger, der efter loven skal opbevares, kan gemmes separat i den lovbestemte periode; et delt rums købsrettighed kan blive tilbage, når forbindelsen til den slettede konto er fjernet. Anonym, samlet produktstatistik uden tilknytning til en konto genidentificeres ikke som data for en bestemt konto. Hvis du har brug for at få eksisterende Sentry-fejlrapporter slettet, skal du skrive det i din e-mail.",
      timing: "Anmodninger via e-mail behandles uden unødig forsinkelse efter identitetskontrol og afsluttes normalt inden for 7 dage.", privacy: "Privatlivspolitik", support: "Support",
    },
    nb: {
      heading: "Slett DayRipple-kontoen og dataene dine", intro: "Slik sletter du dataene som er knyttet til DayRipple-kontoen din.",
      instantTitle: "Slett direkte i appen", instant: "Logg inn på DayRipple, og trykk på <b>Innstillinger → Konto → Slett konto</b>. Når du har bekreftet, starter slettingen umiddelbart.",
      noAccessTitle: "Hvis du ikke får tilgang til appen", noAccess: "Send forespørselen fra e-postadressen du registrerte deg med, ved hjelp av knappen nedenfor. Ikke send passordet ditt eller kortnummeret ditt.", button: "Be om sletting via e-post", deletedTitle: "Data som slettes",
      items: ["Innloggingskonto, e-postadresse, profil og kallenavn", "Medlemskap i rom og token for push-varsler", "Informasjon om uferdige kjøp på enheten, planlagte varsler og status for analyseidentifikatoren", "Hendelser, merkedager／D-dager og oppgaver du har opprettet", "Rom som bare du brukte, og dataene deres"],
      retention: "Delte rom der andre medlemmer er igjen, overføres til dem. Betalingsopplysninger som loven krever at vi oppbevarer, kan lagres separat i den lovbestemte perioden; et delt roms kjøpsrettighet kan bli værende etter at koblingen til den slettede kontoen er fjernet. Anonym, aggregert produktstatistikk uten kontokobling blir ikke reidentifisert som data for en bestemt konto. Hvis du trenger å få slettet eksisterende Sentry-feilrapporter, skriv det i e-posten.",
      timing: "Forespørsler via e-post behandles uten opphold etter identitetskontroll og fullføres normalt innen 7 dager.", privacy: "Personvernerklæring", support: "Brukerstøtte",
    },
    fi: {
      heading: "Poista DayRipple-tilisi ja tietosi", intro: "Näin poistat DayRipple-tiliisi liitetyt tiedot.",
      instantTitle: "Poista heti sovelluksessa", instant: "Kirjaudu DayRippleen ja napauta <b>Asetukset → Tili → Poista tili</b>. Vahvistuksen jälkeen poisto alkaa välittömästi.",
      noAccessTitle: "Jos et pääse sovellukseen", noAccess: "Lähetä pyyntö alla olevalla painikkeella siitä sähköpostiosoitteesta, jolla rekisteröidyit. Älä lähetä salasanaasi tai maksukorttisi numeroa.", button: "Pyydä poistoa sähköpostitse", deletedTitle: "Poistettavat tiedot",
      items: ["Kirjautumistili, sähköpostiosoite, profiili ja kutsumanimi", "Tilajäsenyydet ja push-ilmoitusten tunnisteet", "Laitteelle jääneet tiedot keskeneräisistä ostoista, ajastetut ilmoitukset ja analytiikkatunnisteen tila", "Luomasi tapahtumat, vuosipäivät／D-päivät ja tehtävät", "Vain sinun käyttämäsi tilat ja niiden tiedot"],
      retention: "Jaetut tilat, joissa on muita jäseniä jäljellä, siirretään heille. Maksutiedot, jotka on lain mukaan säilytettävä, voidaan tallentaa erikseen lakisääteisen ajan; jaetun tilan osto-oikeus voi jäädä voimaan, kun sen yhteys poistettuun tiliin on katkaistu. Nimetöntä, koostettua tuotetilastoa ilman tiliyhteyttä ei tunnisteta uudelleen tietyn tilin tiedoiksi. Jos haluat poistaa olemassa olevat Sentry-virheraportit, mainitse siitä sähköpostissasi.",
      timing: "Sähköpostipyynnöt käsitellään viipymättä henkilöllisyyden varmistamisen jälkeen, ja ne valmistuvat yleensä 7 päivän kuluessa.", privacy: "Tietosuojakäytäntö", support: "Tuki",
    },
    sk: {
      heading: "Odstráňte svoj účet DayRipple a údaje", intro: "Takto odstránite údaje spojené s vaším účtom DayRipple.",
      instantTitle: "Odstránenie priamo v aplikácii", instant: "Prihláste sa do DayRipple a ťuknite na <b>Nastavenia → Účet → Odstrániť účet</b>. Po potvrdení sa odstraňovanie spustí okamžite.",
      noAccessTitle: "Ak sa do aplikácie nedostanete", noAccess: "Pomocou tlačidla nižšie odošlite žiadosť z e-mailovej adresy, s ktorou ste sa zaregistrovali. Neposielajte svoje heslo ani číslo platobnej karty.", button: "Požiadať o odstránenie e-mailom", deletedTitle: "Údaje, ktoré sa odstránia",
      items: ["Prihlasovací účet, e-mail, profil a prezývka", "Členstvá v priestoroch a tokeny push oznámení", "Informácie o nedokončených nákupoch v zariadení, naplánované oznámenia a stav analytického identifikátora", "Udalosti, výročia／D-dni a úlohy, ktoré ste vytvorili", "Priestory, ktoré ste používali sami, a ich údaje"],
      retention: "Zdieľané priestory, v ktorých zostávajú ďalší členovia, sa prevedú na nich. Platobné záznamy, ktoré je podľa zákona potrebné uchovávať, sa môžu uchovávať oddelene počas zákonnej lehoty; nárok na nákup zdieľaného priestoru môže zostať zachovaný po odstránení väzby na odstránený účet. Anonymné súhrnné produktové štatistiky bez väzby na účet sa opätovne neidentifikujú ako údaje konkrétneho účtu. Ak potrebujete odstrániť existujúce chybové hlásenia Sentry, uveďte to v e-maile.",
      timing: "Žiadosti e-mailom sa spracúvajú bezodkladne po overení totožnosti a zvyčajne sa dokončia do 7 dní.", privacy: "Zásady ochrany súkromia", support: "Podpora",
    },
    ru: {
      heading: "Удаление аккаунта DayRipple и данных", intro: "Вот как удалить данные, связанные с вашим аккаунтом DayRipple.",
      instantTitle: "Удалить сразу в приложении", instant: "Войдите в DayRipple и нажмите <b>Настройки → Аккаунт → Удалить аккаунт</b>. После подтверждения удаление начнётся немедленно.",
      noAccessTitle: "Если доступа к приложению нет", noAccess: "Отправьте запрос кнопкой ниже с того адреса электронной почты, с которым вы регистрировались. Не отправляйте пароль или номер платёжной карты.", button: "Запросить удаление по эл. почте", deletedTitle: "Какие данные удаляются",
      items: ["Учётные данные для входа, электронная почта, профиль и никнейм", "Участие в пространствах и токены push-уведомлений", "Сведения о незавершённых покупках на устройстве, запланированные уведомления и состояние аналитического идентификатора", "Созданные вами события, годовщины／D-day и задачи", "Пространства, которыми пользовались только вы, и их данные"],
      retention: "Общие пространства, где остаются другие участники, передаются им. Платёжные записи, которые требуется хранить по закону, могут храниться отдельно в течение установленного законом срока; право на покупку общего пространства может сохраниться после разрыва связи с удалённым аккаунтом. Анонимная сводная продуктовая статистика без привязки к аккаунту не переидентифицируется как данные конкретного аккаунта. Если нужно удалить существующие отчёты об ошибках Sentry, укажите это в письме.",
      timing: "Запросы по электронной почте обрабатываются без промедления после подтверждения личности и обычно завершаются в течение 7 дней.", privacy: "Политика конфиденциальности", support: "Поддержка",
    },
    hr: {
      heading: "Izbrišite svoj račun DayRipple i podatke", intro: "Ovako brišete podatke povezane s vašim računom DayRipple.",
      instantTitle: "Brisanje odmah u aplikaciji", instant: "Prijavite se u DayRipple, a zatim dodirnite <b>Postavke → Račun → Izbriši račun</b>. Nakon potvrde brisanje počinje odmah.",
      noAccessTitle: "Ako ne možete pristupiti aplikaciji", noAccess: "Pomoću gumba u nastavku pošaljite zahtjev s adrese e-pošte s kojom ste se registrirali. Nemojte slati svoju lozinku ni broj platne kartice.", button: "Zatraži brisanje e-poštom", deletedTitle: "Podaci koji se brišu",
      items: ["Račun za prijavu, e-pošta, profil i nadimak", "Članstva u prostorima i tokeni push obavijesti", "Podaci o nedovršenim kupnjama na uređaju, zakazane obavijesti i stanje analitičkog identifikatora", "Događaji, godišnjice／D-dani i zadaci koje ste stvorili", "Prostori koje ste koristili samo vi i njihovi podaci"],
      retention: "Dijeljeni prostori u kojima ostaju drugi članovi prenose se na njih. Podaci o plaćanju koje je po zakonu potrebno čuvati mogu se pohraniti odvojeno tijekom zakonskog roka; pravo na kupnju dijeljenog prostora može ostati nakon uklanjanja veze s izbrisanim računom. Anonimna zbirna statistika proizvoda bez veze s računom ne identificira se ponovno kao podaci određenog računa. Ako trebate izbrisati postojeća izvješća o pogreškama iz Sentryja, navedite to u e-poruci.",
      timing: "Zahtjevi e-poštom obrađuju se bez odgode nakon provjere identiteta i obično se dovršavaju u roku od 7 dana.", privacy: "Pravila privatnosti", support: "Podrška",
    },
    sl: {
      heading: "Izbrišite svoj račun DayRipple in podatke", intro: "Tako izbrišete podatke, povezane z vašim računom DayRipple.",
      instantTitle: "Takojšen izbris v aplikaciji", instant: "Prijavite se v DayRipple in se dotaknite <b>Nastavitve → Račun → Izbriši račun</b>. Po potrditvi se izbris začne takoj.",
      noAccessTitle: "Če do aplikacije ne morete dostopati", noAccess: "Z gumbom spodaj pošljite zahtevo z e-poštnega naslova, s katerim ste se registrirali. Ne pošiljajte gesla ali številke plačilne kartice.", button: "Zahtevaj izbris po e-pošti", deletedTitle: "Podatki, ki se izbrišejo",
      items: ["Račun za prijavo, e-pošta, profil in vzdevek", "Članstva v prostorih in žetoni potisnih obvestil", "Podatki o nedokončanih nakupih v napravi, načrtovana obvestila in stanje analitičnega identifikatorja", "Dogodki, obletnice／D-dnevi in opravila, ki ste jih ustvarili", "Prostori, ki ste jih uporabljali samo vi, in njihovi podatki"],
      retention: "Deljeni prostori, v katerih ostajajo drugi člani, se prenesejo nanje. Podatki o plačilih, ki jih je po zakonu treba hraniti, se lahko hranijo ločeno v zakonsko določenem obdobju; pravica do nakupa deljenega prostora lahko ostane, potem ko je povezava z izbrisanim računom odstranjena. Anonimna zbirna statistika izdelka brez povezave z računom se ponovno ne identificira kot podatki določenega računa. Če želite izbrisati obstoječa poročila o napakah Sentry, to navedite v e-sporočilu.",
      timing: "Zahteve po e-pošti obravnavamo nemudoma po preverjanju istovetnosti in jih običajno dokončamo v 7 dneh.", privacy: "Politika zasebnosti", support: "Podpora",
    },
    hi: {
      heading: "अपना DayRipple अकाउंट और डेटा डिलीट करें", intro: "आपके DayRipple अकाउंट से जुड़ा डेटा इस तरह डिलीट किया जाता है।",
      instantTitle: "ऐप में तुरंत डिलीट करें", instant: "DayRipple में साइन इन करें, फिर <b>सेटिंग → अकाउंट → अकाउंट डिलीट करें</b> पर टैप करें। पुष्टि करते ही डिलीट होना शुरू हो जाता है।",
      noAccessTitle: "अगर आप ऐप तक न पहुँच पाएँ", noAccess: "नीचे दिए बटन से, जिस ईमेल पते से आपने साइन अप किया था उसी से डिलीट करने का अनुरोध भेजें। अपना पासवर्ड या पेमेंट कार्ड नंबर न भेजें।", button: "ईमेल से डिलीट का अनुरोध करें", deletedTitle: "जो डेटा डिलीट होता है",
      items: ["लॉगिन अकाउंट, ईमेल, प्रोफ़ाइल और निकनेम", "स्पेस की सदस्यता और पुश नोटिफ़िकेशन टोकन", "डिवाइस पर बची अधूरी ख़रीद की जानकारी, शेड्यूल किए गए नोटिफ़िकेशन और एनालिटिक्स आइडेंटिफ़ायर की स्थिति", "आपके बनाए इवेंट, सालगिरह／D-day और टास्क", "सिर्फ़ आपके इस्तेमाल किए गए स्पेस और उनका डेटा"],
      retention: "जिन शेयर किए गए स्पेस में दूसरे सदस्य बचे हैं, वे उन्हीं सदस्यों को ट्रांसफ़र कर दिए जाते हैं। जिन पेमेंट रिकॉर्ड को क़ानूनन रखना ज़रूरी है, उन्हें तय अवधि तक अलग से रखा जा सकता है; शेयर किए गए स्पेस का ख़रीद अधिकार, डिलीट किए गए अकाउंट से लिंक हटाकर, बना रह सकता है। अकाउंट से बिना किसी लिंक के जुटाए गए अनाम, सामूहिक प्रोडक्ट आँकड़ों को किसी ख़ास अकाउंट के डेटा के रूप में दोबारा नहीं पहचाना जाता। अगर आपको मौजूदा Sentry एरर रिपोर्ट भी डिलीट करानी हैं, तो ईमेल में यह ज़रूर लिखें।",
      timing: "ईमेल से आए अनुरोध पहचान की पुष्टि के बाद बिना देरी के प्रोसेस किए जाते हैं और आम तौर पर 7 दिन के भीतर पूरे हो जाते हैं।", privacy: "प्राइवेसी पॉलिसी", support: "सपोर्ट",
    }
};

  var privacyData = {
    ja: {
      heading: "DayRipple プライバシーポリシー",
      effective: "施行日：2026年7月15日",
      intro: "DayRipple（以下「本サービス」）は、利用者の個人情報を適切に取り扱い、韓国の個人情報保護法を含む適用法令を遵守します。",
      deletionTitle: "アカウントとデータの削除",
      deletion: "アプリの<b>設定 → アカウント → アカウントを削除</b>から直ちに削除できます。アプリを利用できない場合は、<a href=\"./delete-account.html\">アカウント削除リクエストページ</a>をご利用ください。",
      collectTitle: "1. 収集する個人情報",
      headers: ["区分", "項目", "収集時点"],
      rows: [
        ["アカウント情報", "メールアドレス、暗号化された認証情報、ニックネーム、ユーザーID", "登録・ソーシャルログイン時"],
        ["任意設定", "製品改善分析への同意・拒否状況", "利用者が選択した時"],
        ["サービス利用情報", "予定、記念日・D-day、やること、スペース名・メンバー構成", "利用者が入力した時"],
        ["端末・通知情報", "プッシュトークン、OS、言語、タイムゾーン、通知別の同意状況、最終利用時刻", "通知を有効にした時、またはアプリ利用時"],
        ["決済情報", "ストア取引ID、商品ID、購入・返金状況、購入連携用のランダム識別子", "アプリ内購入時"],
        ["匿名利用統計", "完了した主要操作のイベント名と正規化カテゴリ、アプリ版、OS、匿名インストール識別子", "製品改善分析を明示的に許可した後"],
        ["エラー情報", "アプリ版、OS、エラー種別・コード位置、内部ユーザーID", "エラー・クラッシュ発生時"],
      ],
      payment: "決済はApple App StoreまたはGoogle Playが処理します。本サービスはカード番号や銀行口座番号などの決済手段情報を収集・保存しません。",
      excluded: "PostHogの利用統計とSentryのエラー情報には、メール、ニックネーム、スペース名、関係の種類、招待コード・リンク、予定・記念日・やることのタイトルやメモ、決済取引ID・トークンを送信しません。広告識別子、位置情報、連絡先、写真、他社アプリ・ウェブでの行動は収集せず、画面録画やセッションリプレイも使用しません。",
      purposesTitle: "2. 利用目的",
      purposes: ["本人確認とログイン", "招待されたスペースのメンバー間で予定・記念日・やることを共有", "予定・記念日のリマインダーとメンバー活動通知の送信", "別途許可された場合、言語・タイムゾーン・スペース状況に応じた再利用促進通知の送信", "スペース買い切りプラン・追加メンバー枠の確認と返金・取消時の権限調整", "明示的に許可された場合の匿名利用フロー分析による機能改善", "エラー・クラッシュ対応、重複決済・不正利用の防止"],
      retentionTitle: "3. 保管と削除",
      retention: ["アカウント削除時、アカウント、プロフィール、メンバーシップ、端末トークン、分析設定、および作成した予定・記念日・やることを速やかに削除します。", "一人で使用していたスペースは全削除します。他のメンバーが残る共有スペースは残りのメンバーに移管しますが、削除した利用者のコンテンツは削除します。", "他のメンバーを保護するため、共有スペースの購入権限は残る場合がありますが、削除されたアカウントとの紐付けは解除します。", "PostHogはアカウントIDや個人プロフィールを作らない匿名モードで使用します。ログアウト・削除時に端末の匿名識別子を初期化し、集計済み統計を特定のアカウントに再紐付けしません。", "Sentryレポートは運用上必要な期間だけ保管後に削除します。既存レポートの削除は問い合わせ先へ申請できます。", "法令で保存が必要な決済記録は法定期間中、分離保管した後に削除します。"],
      refundTitle: "返金とデータ保管",
      refunds: ["買い切りプランが返金・取消されると有料機能を停止し、無料上限を再適用します。", "追加メンバー枠の取引記録とスペースデータは直ちに削除しません。定員超過のメンバーは、データ削除ではなくアクセス停止となる場合があります。", "有効な権限で定員が回復すると、停止中のメンバーは参加順に自動復帰します。アカウント削除はこの方針とは別に処理します。"],
      processorsTitle: "4. 第三者提供および取扱いの委託",
      processorsIntro: "本サービスは個人情報を販売せず、広告追跡にも使用しません。運営のため、以下の事業者が処理受託者としてデータを取り扱います。",
      processorHeaders: ["処理事業者", "業務", "保管場所"],
      processorTasks: [["データベース・認証サーバーの運用", "韓国ソウルリージョン（AWS）"], ["許可されたプッシュ通知の送信", "米国"], ["ソーシャルログイン、アプリ内決済、レシート検証", "各社の方針による"], ["明示的に許可された匿名製品利用統計の処理", "米国その他のサービスリージョン"], ["エラー・クラッシュレポートの処理", "米国その他のサービスリージョン"]],
      rightsTitle: "5. 利用者の権利",
      rights: "製品改善分析は初期状態で無効です。同意・拒否を選択する前にPostHogを初期化したり利用統計を送信したりしません。選択はアカウントと端末に保存され、再インストールや端末変更後も尊重されます。設定からいつでも分析を無効にでき、その後は新しいPostHogイベントを送信しません。プロフィール編集とアカウント削除も設定から行えます。アプリにアクセスできない場合は<a href=\"./delete-account.html\">ウェブ削除リクエスト</a>をご利用ください。",
      officerTitle: "6. 個人情報保護責任者・お問い合わせ",
      officer: "責任者：Park Byungjun",
      contact: "お問い合わせ",
      support: "DayRipple サポートページ",
      changesTitle: "7. 本方針の変更",
      changes: "本方針を変更する場合は、アプリまたは本ページでお知らせします。",
    },
    "zh-Hans": {
      heading: "DayRipple 隐私政策", effective: "生效日期：2026年7月15日",
      intro: "DayRipple（以下简称“本服务”）重视并妥善处理用户的个人信息，遵守包括韩国《个人信息保护法》在内的适用法律法规。",
      deletionTitle: "删除账户和数据", deletion: "你可以在应用的<b>设置 → 账户 → 删除账户</b>中立即删除。无法使用应用时，请使用<a href=\"./delete-account.html\">账户删除申请页面</a>。",
      collectTitle: "1. 我们收集的个人信息", headers: ["类别", "项目", "收集时间"],
      rows: [["账户信息","邮箱、加密认证信息、昵称、用户ID","注册或社交登录时"],["可选设置","是否允许产品改进分析","用户作出选择时"],["服务使用信息","日程、纪念日／倒数日、待办事项、空间名称和成员构成","用户自行输入时"],["设备与通知信息","推送令牌、操作系统、语言、时区、各类通知授权状态、最后使用时间","开启通知或使用应用时"],["付款信息","商店交易ID、产品ID、购买／退款状态、用于关联购买的随机标识符","应用内购买时"],["匿名使用统计","已完成主要操作的事件名称及标准化类别、应用版本、操作系统、匿名安装标识符","明确允许产品改进分析后"],["错误信息","应用版本、操作系统、错误类型／代码位置、内部用户ID","发生错误或崩溃时"]],
      payment: "付款由 Apple App Store 或 Google Play 处理。本服务不收集或存储银行卡号、银行账户等付款方式信息。",
      excluded: "PostHog 使用统计和 Sentry 错误信息不会包含邮箱、昵称、空间名称、关系类型、邀请码／链接、日程／纪念日／待办事项的标题和备注、付款交易ID或令牌。我们不收集广告标识符、位置、通讯录、照片或用户在其他公司的应用和网站上的活动，也不使用屏幕录制或会话回放。",
      purposesTitle: "2. 使用目的", purposes: ["识别用户和登录","在受邀空间成员之间共享日程、纪念日和待办事项","发送日程／纪念日提醒和成员活动推送","经单独允许后，根据语言、时区和空间状态发送召回提醒","验证空间永久版和额外成员权益，并在退款或取消时调整权限","经明确允许后，通过匿名使用流程分析改进功能","处理错误与崩溃，防止重复扣款和欺诈使用"],
      retentionTitle: "3. 保存与删除", retention: ["删除账户时，我们会及时删除账户、个人资料、成员资格、设备令牌、分析选择以及你创建的日程、纪念日和待办事项。","你独自使用的空间会全部删除；仍有其他成员的共享空间会移交给剩余成员，但你创建的内容会被删除。","为保护其他成员，共享空间的购买权益可能保留，但会解除与已删除账户的关联。","PostHog 采用不创建账户ID或个人档案的匿名分析模式。退出或删除账户时会重置设备匿名标识符，已汇总的匿名统计不会重新关联至特定账户。","Sentry 错误报告仅在运营所需期间保存，之后删除。已有报告可通过联系方式申请删除。","法律要求保留的付款记录会在法定期限内单独保存，之后销毁。"],
      refundTitle: "退款与数据保存", refunds: ["空间永久版退款或取消后，付费功能会停止，并重新适用免费限额。","额外成员交易记录和空间数据不会立即销毁。超过容量的成员可能会被暂停访问，而不是删除数据。","恢复有效权益和容量后，被暂停的成员会按加入顺序自动恢复。账户删除申请会另行处理。"],
      processorsTitle: "4. 向第三方共享及委托处理", processorsIntro: "本服务不出售个人信息，也不将其用于广告追踪。以下公司作为处理方为本服务处理数据。",
      processorHeaders: ["处理方","工作内容","存储位置"], processorTasks: [["数据库和认证服务器运营","韩国首尔区域（AWS）"],["发送你允许的推送通知","美国"],["社交登录、应用内购买和收据验证","依各公司政策"],["处理经明确允许的匿名产品使用统计","美国及其他服务区域"],["处理错误／崩溃报告","美国及其他服务区域"]],
      rightsTitle: "5. 你的权利", rights: "产品改进分析默认关闭。在你选择允许或拒绝前，我们不会初始化 PostHog 或发送使用统计。选择会保存在账户和设备中，并在重新安装或更换设备后继续生效。你可以随时在设置中关闭分析，之后不会再发送新的 PostHog 事件。你也可以在设置中编辑资料和删除账户；无法访问应用时，可使用<a href=\"./delete-account.html\">网页删除申请</a>。",
      officerTitle: "6. 个人信息保护负责人及联系方式", officer: "负责人：Park Byungjun", contact: "联系方式", support: "DayRipple 帮助页面",
      changesTitle: "7. 政策变更", changes: "本政策发生变更时，我们会通过应用或本页面通知。",
    },
    "zh-Hant": {
      heading: "DayRipple 隱私權政策", effective: "生效日期：2026年7月15日",
      intro: "DayRipple（以下稱「本服務」）重視並妥善處理使用者的個人資料，遵守包括韓國《個人資料保護法》在內的適用法規。",
      deletionTitle: "刪除帳號和資料", deletion: "你可以在應用程式的<b>設定 → 帳號 → 刪除帳號</b>中立即刪除。無法使用應用程式時，請使用<a href=\"./delete-account.html\">帳號刪除申請頁面</a>。",
      collectTitle: "1. 我們蒐集的個人資料", headers: ["類別","項目","蒐集時間"],
      rows: [["帳號資訊","電子郵件、加密驗證資訊、暱稱、使用者ID","註冊或社群登入時"],["選用設定","是否允許產品改進分析","使用者作出選擇時"],["服務使用資訊","行程、紀念日／倒數日、待辦事項、空間名稱和成員組成","使用者自行輸入時"],["裝置與通知資訊","推播權杖、作業系統、語言、時區、各類通知授權狀態、最後使用時間","開啟通知或使用應用程式時"],["付款資訊","商店交易ID、產品ID、購買／退款狀態、用於連結購買的隨機識別碼","應用程式內購買時"],["匿名使用統計","已完成主要操作的事件名稱與標準化分類、應用程式版本、作業系統、匿名安裝識別碼","明確允許產品改進分析後"],["錯誤資訊","應用程式版本、作業系統、錯誤類型／程式碼位置、內部使用者ID","發生錯誤或當機時"]],
      payment: "付款由 Apple App Store 或 Google Play 處理。本服務不蒐集或儲存信用卡號、銀行帳戶等付款方式資訊。",
      excluded: "PostHog 使用統計和 Sentry 錯誤資訊不會包含電子郵件、暱稱、空間名稱、關係類型、邀請碼／連結、行程／紀念日／待辦事項的標題和備註、付款交易ID或權杖。我們不蒐集廣告識別碼、位置、聯絡人、照片或使用者在其他公司應用程式和網站上的活動，也不使用螢幕錄製或工作階段重播。",
      purposesTitle: "2. 使用目的", purposes: ["識別使用者和登入","在受邀空間成員間共享行程、紀念日和待辦事項","傳送行程／紀念日提醒和成員活動推播","經個別允許後，依語言、時區和空間狀態傳送召回提醒","驗證空間永久版和額外成員權益，並在退款或取消時調整權限","經明確允許後，透過匿名使用流程分析改進功能","處理錯誤與當機，防止重複扣款和不當使用"],
      retentionTitle: "3. 保存與刪除", retention: ["刪除帳號時，我們會儘速刪除帳號、個人資料、成員資格、裝置權杖、分析選擇及你建立的行程、紀念日和待辦事項。","你獨自使用的空間會全部刪除；仍有其他成員的共享空間會移交給剩餘成員，但你建立的內容會被刪除。","為保護其他成員，共享空間的購買權益可能保留，但會解除與已刪除帳號的連結。","PostHog 採用不建立帳號ID或個人檔案的匿名分析模式。登出或刪除帳號時會重設裝置匿名識別碼，已彙整的匿名統計不會重新連結至特定帳號。","Sentry 錯誤報告僅在營運所需期間保存，之後刪除。既有報告可透過聯絡方式申請刪除。","法律要求保留的付款紀錄會在法定期間內另行保存，之後銷毀。"],
      refundTitle: "退款與資料保存", refunds: ["空間永久版退款或取消後，付費功能會停止，並重新套用免費限額。","額外成員交易紀錄和空間資料不會立即銷毀。超過容量的成員可能會暫停存取，而非刪除資料。","恢復有效權益和容量後，被暫停的成員會依加入順序自動恢復。帳號刪除申請會另行處理。"],
      processorsTitle: "4. 向第三方分享及委託處理", processorsIntro: "本服務不出售個人資料，也不將其用於廣告追蹤。以下公司作為處理方為本服務處理資料。",
      processorHeaders: ["處理方","工作內容","儲存位置"], processorTasks: [["資料庫和驗證伺服器營運","韓國首爾區域（AWS）"],["傳送你允許的推播通知","美國"],["社群登入、應用程式內購買和收據驗證","依各公司政策"],["處理經明確允許的匿名產品使用統計","美國及其他服務區域"],["處理錯誤／當機報告","美國及其他服務區域"]],
      rightsTitle: "5. 你的權利", rights: "產品改進分析預設為關閉。在你選擇允許或拒絕前，我們不會初始化 PostHog 或傳送使用統計。選擇會儲存在帳號和裝置中，重新安裝或更換裝置後仍會生效。你可以隨時在設定中關閉分析，之後不會再傳送新的 PostHog 事件。你也可以在設定中編輯資料和刪除帳號；無法存取應用程式時，可使用<a href=\"./delete-account.html\">網頁刪除申請</a>。",
      officerTitle: "6. 個人資料保護負責人與聯絡方式", officer: "負責人：Park Byungjun", contact: "聯絡方式", support: "DayRipple 支援頁面",
      changesTitle: "7. 政策變更", changes: "本政策變更時，我們會透過應用程式或本頁面通知。",
    },
    vi: {
      heading: "Chính sách quyền riêng tư của DayRipple", effective: "Ngày có hiệu lực: 15 tháng 7 năm 2026",
      intro: "DayRipple (“Dịch vụ”) trân trọng và xử lý cẩn trọng thông tin cá nhân của bạn, đồng thời tuân thủ pháp luật hiện hành, bao gồm Luật Bảo vệ Thông tin Cá nhân của Hàn Quốc.",
      deletionTitle: "Xóa tài khoản và dữ liệu", deletion: "Bạn có thể xóa ngay trong ứng dụng tại <b>Cài đặt → Tài khoản → Xóa tài khoản</b>. Nếu không thể dùng ứng dụng, hãy sử dụng <a href=\"./delete-account.html\">trang yêu cầu xóa tài khoản</a>.",
      collectTitle: "1. Thông tin cá nhân chúng tôi thu thập", headers: ["Loại","Thông tin","Thời điểm thu thập"],
      rows: [["Thông tin tài khoản","Email, thông tin xác thực đã mã hóa, biệt danh, ID người dùng","Khi đăng ký hoặc đăng nhập bằng mạng xã hội"],["Cài đặt tùy chọn","Trạng thái đồng ý hoặc từ chối phân tích cải thiện sản phẩm","Khi bạn lựa chọn"],["Thông tin sử dụng","Sự kiện, ngày kỷ niệm／đếm ngược, việc cần làm, tên không gian và thành viên","Khi bạn tự nhập"],["Thiết bị và thông báo","Token đẩy, hệ điều hành, ngôn ngữ, múi giờ, trạng thái cho phép theo loại thông báo, lần dùng cuối","Khi bật thông báo hoặc dùng ứng dụng"],["Thanh toán","ID giao dịch, ID sản phẩm, trạng thái mua／hoàn tiền, mã ngẫu nhiên để liên kết giao dịch","Khi mua trong ứng dụng"],["Thống kê ẩn danh","Tên sự kiện của các thao tác chính đã hoàn tất và nhóm chuẩn hóa, phiên bản ứng dụng, hệ điều hành, mã cài đặt ẩn danh","Sau khi bạn cho phép rõ ràng"],["Lỗi","Phiên bản ứng dụng, hệ điều hành, loại lỗi／vị trí mã, ID người dùng nội bộ","Khi xảy ra lỗi hoặc sự cố"]],
      payment: "Thanh toán do Apple App Store hoặc Google Play xử lý. Dịch vụ không thu thập hay lưu số thẻ, tài khoản ngân hàng hoặc thông tin phương thức thanh toán khác.",
      excluded: "Thống kê PostHog và báo cáo Sentry không chứa email, biệt danh, tên không gian, loại quan hệ, mã／liên kết mời, tiêu đề hay ghi chú của sự kiện, ngày kỷ niệm và việc cần làm, hoặc ID／token giao dịch. Chúng tôi không thu thập mã quảng cáo, vị trí, danh bạ, ảnh hay hoạt động trên ứng dụng và trang web của công ty khác; cũng không ghi màn hình hoặc phát lại phiên.",
      purposesTitle: "2. Mục đích sử dụng", purposes: ["Nhận diện thành viên và đăng nhập","Chia sẻ sự kiện, ngày kỷ niệm và việc cần làm giữa các thành viên được mời","Gửi lời nhắc và thông báo hoạt động của thành viên","Khi được cho phép riêng, gửi thông báo quay lại phù hợp với ngôn ngữ, múi giờ và trạng thái không gian","Xác minh quyền trọn đời／thêm thành viên và điều chỉnh quyền khi hoàn tiền hoặc hủy","Cải thiện tính năng bằng phân tích luồng sử dụng ẩn danh khi được cho phép rõ ràng","Xử lý lỗi và ngăn thanh toán trùng lặp hoặc sử dụng gian lận"],
      retentionTitle: "3. Lưu giữ và xóa", retention: ["Khi xóa tài khoản, chúng tôi nhanh chóng xóa tài khoản, hồ sơ, tư cách thành viên, token thiết bị, lựa chọn phân tích và nội dung bạn tạo.","Không gian dùng một mình bị xóa toàn bộ. Không gian chung còn thành viên khác được chuyển cho họ, nhưng nội dung do bạn tạo sẽ bị xóa.","Quyền mua của không gian chung có thể được giữ để bảo vệ thành viên khác, nhưng liên kết với tài khoản đã xóa sẽ bị gỡ.","PostHog hoạt động ở chế độ ẩn danh, không tạo ID tài khoản hay hồ sơ cá nhân. Khi đăng xuất hoặc xóa tài khoản, mã ẩn danh trên thiết bị được đặt lại và số liệu đã tổng hợp không được liên kết lại.","Báo cáo Sentry chỉ được giữ trong thời gian cần thiết cho vận hành rồi xóa. Bạn có thể yêu cầu xóa báo cáo hiện có.","Hồ sơ thanh toán phải lưu theo luật được tách riêng trong thời hạn luật định rồi tiêu hủy."],
      refundTitle: "Hoàn tiền và lưu giữ dữ liệu", refunds: ["Khi quyền trọn đời bị hoàn hoặc hủy, tính năng trả phí dừng và giới hạn miễn phí được áp dụng lại.","Hồ sơ giao dịch thêm thành viên và dữ liệu không gian không bị xóa ngay. Thành viên vượt quá sức chứa có thể bị tạm dừng truy cập thay vì xóa dữ liệu.","Khi sức chứa được khôi phục bằng quyền hợp lệ, thành viên bị tạm dừng được tự động khôi phục theo thứ tự tham gia. Yêu cầu xóa tài khoản được xử lý riêng."],
      processorsTitle: "4. Chia sẻ với bên thứ ba và ủy quyền xử lý", processorsIntro: "Dịch vụ không bán thông tin cá nhân hoặc dùng cho theo dõi quảng cáo. Các công ty sau xử lý dữ liệu để vận hành Dịch vụ.",
      processorHeaders: ["Bên xử lý","Công việc","Nơi lưu trữ"], processorTasks: [["Vận hành cơ sở dữ liệu và máy chủ xác thực","Khu vực Seoul, Hàn Quốc (AWS)"],["Gửi thông báo đẩy bạn đã cho phép","Hoa Kỳ"],["Đăng nhập xã hội, mua trong ứng dụng và xác minh biên lai","Theo chính sách từng công ty"],["Xử lý thống kê sản phẩm ẩn danh khi được cho phép rõ ràng","Hoa Kỳ và các khu vực dịch vụ khác"],["Xử lý báo cáo lỗi／sự cố","Hoa Kỳ và các khu vực dịch vụ khác"]],
      rightsTitle: "5. Quyền của bạn", rights: "Phân tích cải thiện sản phẩm mặc định tắt. Chúng tôi không khởi tạo PostHog hoặc gửi thống kê trước khi bạn lựa chọn. Lựa chọn được lưu trên tài khoản và thiết bị, tiếp tục được tôn trọng sau khi cài lại hoặc đổi thiết bị. Bạn có thể tắt bất cứ lúc nào; sau đó không có sự kiện PostHog mới được gửi. Bạn cũng có thể sửa hồ sơ và xóa tài khoản trong cài đặt; nếu không truy cập được ứng dụng, hãy dùng <a href=\"./delete-account.html\">yêu cầu xóa trên web</a>.",
      officerTitle: "6. Người phụ trách quyền riêng tư và liên hệ", officer: "Người phụ trách: Park Byungjun", contact: "Liên hệ", support: "Trang hỗ trợ DayRipple",
      changesTitle: "7. Thay đổi chính sách", changes: "Nếu chính sách thay đổi, chúng tôi sẽ thông báo qua ứng dụng hoặc trên trang này.",
    },
    es: {
      heading: "Política de privacidad de DayRipple", effective: "Fecha de entrada en vigor: 15 de julio de 2026",
      intro: "DayRipple (el «Servicio») trata tus datos personales con cuidado y cumple la legislación aplicable, incluida la Ley de Protección de Información Personal de Corea.",
      deletionTitle: "Eliminación de la cuenta y los datos", deletion: "Puedes eliminarlos directamente en <b>Ajustes → Cuenta → Eliminar cuenta</b>. Si no puedes usar la app, utiliza la <a href=\"./delete-account.html\">página de solicitud de eliminación</a>.",
      collectTitle: "1. Datos personales que recopilamos", headers: ["Categoría","Datos","Cuándo se recogen"],
      rows: [["Cuenta","Correo electrónico, credenciales cifradas, apodo e ID de usuario","Al registrarte o iniciar sesión con una cuenta social"],["Ajuste opcional","Consentimiento o rechazo del análisis para mejorar el producto","Cuando eliges una opción"],["Uso del servicio","Planes, aniversarios／D-days, tareas, nombres de espacios y composición de miembros","Cuando los introduces"],["Dispositivo y notificaciones","Token push, sistema operativo, idioma, zona horaria, permisos por tipo y último uso","Al activar las notificaciones o usar la app"],["Pago","ID de transacción y producto, estado de compra／reembolso e identificador aleatorio de vinculación","Al comprar dentro de la app"],["Estadísticas anónimas","Nombres y categorías normalizadas de acciones clave completadas, versión, sistema operativo e identificador anónimo de instalación","Tras permitirlo expresamente"],["Errores","Versión, sistema operativo, tipo de error／ubicación del código e ID interno","Cuando ocurre un error o cierre inesperado"]],
      payment: "Los pagos los procesa Apple App Store o Google Play. El Servicio no recoge ni almacena números de tarjeta, cuentas bancarias u otros datos del método de pago.",
      excluded: "Las estadísticas de PostHog y los informes de Sentry no incluyen correo, apodo, nombres de espacios, tipo de relación, códigos／enlaces de invitación, títulos o notas de planes, aniversarios y tareas, ni ID o tokens de pago. No recogemos identificadores publicitarios, ubicación, contactos, fotos ni actividad en apps o webs de otras empresas; tampoco usamos grabación de pantalla ni reproducción de sesiones.",
      purposesTitle: "2. Finalidades", purposes: ["Identificación e inicio de sesión","Compartir planes, aniversarios y tareas entre miembros invitados","Enviar recordatorios y notificaciones de actividad","Con permiso específico, enviar recordatorios adaptados al idioma, la zona horaria y el estado del espacio","Verificar pases vitalicios／miembros adicionales y ajustar el acceso tras reembolsos o cancelaciones","Mejorar funciones mediante análisis anónimo, solo con permiso expreso","Resolver errores y evitar cobros duplicados o usos fraudulentos"],
      retentionTitle: "3. Conservación y eliminación", retention: ["Al eliminar la cuenta, borramos sin demora la cuenta, el perfil, las membresías, los tokens, la elección de análisis y el contenido que creaste.","Los espacios usados en solitario se eliminan por completo. Los compartidos con otros miembros se transfieren a esas personas, pero tu contenido se elimina.","Los derechos de compra de un espacio compartido pueden permanecer para proteger a los demás, sin vínculo con la cuenta borrada.","PostHog se usa de forma anónima, sin crear ID de cuenta ni perfiles personales. Al cerrar sesión o eliminar la cuenta se restablece el identificador anónimo y las estadísticas agregadas no se vuelven a vincular.","Los informes de Sentry se conservan solo durante el tiempo operativo necesario y luego se eliminan. Puedes pedir que se borren informes existentes.","Los registros de pago exigidos por ley se guardan por separado durante el plazo legal y después se destruyen."],
      refundTitle: "Reembolsos y conservación de datos", refunds: ["Si se reembolsa o cancela un pase vitalicio, se detienen las funciones de pago y vuelven a aplicarse los límites gratuitos.","Los registros de miembros adicionales y los datos del espacio no se eliminan de inmediato. El acceso de miembros que superen la capacidad puede suspenderse sin borrar sus datos.","Cuando se restablece la capacidad mediante un derecho válido, los miembros suspendidos recuperan el acceso por orden de incorporación. La eliminación de cuentas se trata por separado."],
      processorsTitle: "4. Comunicación a terceros y encargados del tratamiento", processorsIntro: "El Servicio no vende datos personales ni los utiliza para seguimiento publicitario. Las siguientes empresas tratan datos para prestar el Servicio.",
      processorHeaders: ["Encargado","Tarea","Ubicación"], processorTasks: [["Base de datos y servidor de autenticación","Región de Seúl, Corea (AWS)"],["Envío de notificaciones push autorizadas","Estados Unidos"],["Inicio de sesión social, compras y verificación de recibos","Según la política de cada empresa"],["Estadísticas anónimas del producto con permiso expreso","Estados Unidos y otras regiones del servicio"],["Informes de errores y cierres inesperados","Estados Unidos y otras regiones del servicio"]],
      rightsTitle: "5. Tus derechos", rights: "El análisis para mejorar el producto está desactivado de forma predeterminada. No iniciamos PostHog ni enviamos estadísticas antes de que elijas. La elección se guarda en la cuenta y el dispositivo y se respeta tras reinstalar o cambiar de dispositivo. Puedes desactivarlo en cualquier momento; después no se enviarán nuevos eventos. También puedes editar tu perfil y eliminar la cuenta desde Ajustes; si no puedes acceder a la app, usa la <a href=\"./delete-account.html\">solicitud web</a>.",
      officerTitle: "6. Responsable de privacidad y contacto", officer: "Responsable: Park Byungjun", contact: "Contacto", support: "Página de ayuda de DayRipple",
      changesTitle: "7. Cambios de la política", changes: "Si esta política cambia, te informaremos mediante la app o esta página.",
    },
    "pt-BR": {
      heading: "Política de Privacidade do DayRipple", effective: "Vigência: 15 de julho de 2026",
      intro: "O DayRipple (o “Serviço”) trata seus dados pessoais com cuidado e cumpre a legislação aplicável, inclusive a Lei de Proteção de Informações Pessoais da Coreia.",
      deletionTitle: "Exclusão da conta e dos dados", deletion: "Você pode excluir imediatamente em <b>Ajustes → Conta → Excluir conta</b>. Se não conseguir usar o app, use a <a href=\"./delete-account.html\">página de solicitação de exclusão</a>.",
      collectTitle: "1. Dados pessoais que coletamos", headers: ["Categoria","Dados","Quando são coletados"],
      rows: [["Conta","Email, credenciais criptografadas, apelido e ID do usuário","No cadastro ou login social"],["Ajuste opcional","Consentimento ou recusa da análise de melhoria do produto","Quando você escolhe"],["Uso do serviço","Eventos, datas especiais／D-days, tarefas, nomes dos espaços e membros","Quando você insere"],["Dispositivo e notificações","Token push, sistema operacional, idioma, fuso horário, permissões por tipo e último uso","Ao ativar notificações ou usar o app"],["Pagamento","ID da transação e do produto, status de compra／reembolso e identificador aleatório de vínculo","Na compra pelo app"],["Estatísticas anônimas","Nomes e categorias normalizadas de ações principais concluídas, versão, sistema operacional e identificador anônimo da instalação","Após autorização expressa"],["Erros","Versão, sistema operacional, tipo de erro／local do código e ID interno","Quando ocorre erro ou falha"]],
      payment: "Os pagamentos são processados pela Apple App Store ou pelo Google Play. O Serviço não coleta nem armazena números de cartão, conta bancária ou outros dados do meio de pagamento.",
      excluded: "As estatísticas do PostHog e os relatórios do Sentry não incluem email, apelido, nomes dos espaços, tipo de relação, códigos／links de convite, títulos ou notas de eventos, datas especiais e tarefas, nem IDs ou tokens de pagamento. Não coletamos identificadores de publicidade, localização, contatos, fotos ou atividades em apps e sites de outras empresas; também não usamos gravação de tela nem reprodução de sessão.",
      purposesTitle: "2. Finalidades", purposes: ["Identificação e login","Compartilhamento de eventos, datas especiais e tarefas entre membros convidados","Envio de lembretes e notificações de atividade","Com permissão específica, envio de lembretes adequados ao idioma, fuso e estado do espaço","Verificação de passe vitalício／membros adicionais e ajuste de acesso após reembolso ou cancelamento","Melhoria de funções por análise anônima, somente com autorização expressa","Tratamento de erros e prevenção de cobranças duplicadas ou fraude"],
      retentionTitle: "3. Retenção e exclusão", retention: ["Ao excluir a conta, removemos sem demora a conta, o perfil, as participações, os tokens, a escolha de análise e o conteúdo criado por você.","Espaços usados só por você são excluídos por completo. Espaços compartilhados são transferidos aos membros restantes, mas seu conteúdo é apagado.","Os direitos de compra de um espaço compartilhado podem permanecer para proteger os demais membros, sem vínculo com a conta excluída.","O PostHog é usado de forma anônima, sem criar ID de conta ou perfil pessoal. Ao sair ou excluir a conta, o identificador anônimo é redefinido e as estatísticas agregadas não são vinculadas novamente.","Relatórios do Sentry são mantidos apenas pelo período operacional necessário e depois excluídos. Você pode solicitar a exclusão de relatórios existentes.","Registros de pagamento exigidos por lei são guardados separadamente pelo prazo legal e depois eliminados."],
      refundTitle: "Reembolsos e retenção de dados", refunds: ["Se um passe vitalício for reembolsado ou cancelado, os recursos pagos param e os limites gratuitos voltam a valer.","Registros de membros adicionais e dados do espaço não são excluídos imediatamente. O acesso de membros acima da capacidade pode ser suspenso sem apagar os dados.","Quando a capacidade é restaurada por um direito válido, os membros suspensos voltam por ordem de entrada. A exclusão da conta é tratada separadamente."],
      processorsTitle: "4. Compartilhamento e operadores de dados", processorsIntro: "O Serviço não vende dados pessoais nem os usa para rastreamento publicitário. As empresas abaixo tratam dados para operar o Serviço.",
      processorHeaders: ["Operador","Atividade","Local"], processorTasks: [["Banco de dados e autenticação","Região de Seul, Coreia (AWS)"],["Envio de notificações push autorizadas","Estados Unidos"],["Login social, compras e validação de recibos","Conforme a política de cada empresa"],["Estatísticas anônimas com autorização expressa","Estados Unidos e outras regiões do serviço"],["Relatórios de erros e falhas","Estados Unidos e outras regiões do serviço"]],
      rightsTitle: "5. Seus direitos", rights: "A análise de melhoria vem desativada. Não iniciamos o PostHog nem enviamos estatísticas antes da sua escolha. Ela é salva na conta e no dispositivo e continua válida após reinstalação ou troca de aparelho. Você pode desativá-la a qualquer momento; depois disso, nenhum evento novo é enviado. Também é possível editar o perfil e excluir a conta nos Ajustes; sem acesso ao app, use a <a href=\"./delete-account.html\">solicitação pela web</a>.",
      officerTitle: "6. Responsável por privacidade e contato", officer: "Responsável: Park Byungjun", contact: "Contato", support: "Página de ajuda do DayRipple",
      changesTitle: "7. Alterações", changes: "Se esta política mudar, avisaremos pelo app ou nesta página.",
    },
    de: {
      heading: "Datenschutzerklärung von DayRipple", effective: "Gültig ab: 15. Juli 2026",
      intro: "DayRipple (der „Dienst“) behandelt deine personenbezogenen Daten sorgfältig und hält die geltenden Gesetze ein, einschließlich des koreanischen Gesetzes zum Schutz personenbezogener Daten.",
      deletionTitle: "Konto und Daten löschen", deletion: "Du kannst dein Konto unter <b>Einstellungen → Konto → Konto löschen</b> sofort löschen. Wenn du die App nicht nutzen kannst, verwende die <a href=\"./delete-account.html\">Seite für Löschanträge</a>.",
      collectTitle: "1. Erhobene personenbezogene Daten", headers: ["Kategorie","Daten","Zeitpunkt"],
      rows: [["Kontodaten","E-Mail-Adresse, verschlüsselte Anmeldedaten, Anzeigename, Nutzer-ID","Bei Registrierung oder Social Login"],["Optionale Einstellung","Einwilligung oder Ablehnung der Produktanalyse","Bei deiner Auswahl"],["Nutzungsdaten","Termine, Jahrestage／D-Days, Aufgaben, Bereichsnamen und Mitglieder","Bei deiner Eingabe"],["Gerät und Benachrichtigungen","Push-Token, Betriebssystem, Sprache, Zeitzone, Berechtigungen nach Typ, letzte Nutzung","Beim Aktivieren von Benachrichtigungen oder Nutzen der App"],["Zahlung","Transaktions- und Produkt-ID, Kauf／Erstattung, zufällige Kennung zur Zuordnung","Beim In-App-Kauf"],["Anonyme Statistik","Namen und normalisierte Kategorien abgeschlossener Hauptaktionen, App-Version, Betriebssystem, anonyme Installationskennung","Nach ausdrücklicher Einwilligung"],["Fehler","App-Version, Betriebssystem, Fehlertyp／Codestelle, interne Nutzer-ID","Bei Fehlern oder Abstürzen"]],
      payment: "Zahlungen werden vom Apple App Store oder Google Play verarbeitet. Der Dienst erhebt oder speichert keine Karten- oder Bankdaten.",
      excluded: "PostHog-Statistiken und Sentry-Berichte enthalten keine E-Mail, Anzeigenamen, Bereichsnamen, Beziehungsart, Einladungscodes／Links, Titel oder Notizen von Terminen, Jahrestagen und Aufgaben sowie keine Zahlungs-IDs oder Tokens. Wir erheben keine Werbe-IDs, Standorte, Kontakte, Fotos oder Aktivitäten in Apps und Websites anderer Anbieter und nutzen keine Bildschirmaufzeichnung oder Sitzungswiedergabe.",
      purposesTitle: "2. Zwecke", purposes: ["Identifizierung und Anmeldung","Teilen von Terminen, Jahrestagen und Aufgaben zwischen eingeladenen Mitgliedern","Senden von Erinnerungen und Aktivitätsbenachrichtigungen","Bei gesonderter Erlaubnis: Rückkehrhinweise passend zu Sprache, Zeitzone und Bereichsstatus","Prüfung von lebenslangem Pass／Zusatzplätzen und Zugriffsanpassung bei Erstattung oder Stornierung","Funktionsverbesserung durch anonyme Analyse nur mit ausdrücklicher Einwilligung","Fehlerbehebung und Schutz vor Doppelbelastungen oder Missbrauch"],
      retentionTitle: "3. Aufbewahrung und Löschung", retention: ["Bei Kontolöschung entfernen wir unverzüglich Konto, Profil, Mitgliedschaften, Tokens, Analyseauswahl und deine Inhalte.","Allein genutzte Bereiche werden vollständig gelöscht. Geteilte Bereiche werden auf verbleibende Mitglieder übertragen; deine Inhalte werden gelöscht.","Kaufrechte eines geteilten Bereichs können zum Schutz anderer Mitglieder verbleiben, werden aber vom gelöschten Konto getrennt.","PostHog läuft anonym und erstellt keine Konto-ID oder persönlichen Profile. Bei Abmeldung oder Löschung wird die anonyme Gerätekennung zurückgesetzt; aggregierte Daten werden nicht erneut zugeordnet.","Sentry-Berichte werden nur so lange wie betrieblich nötig aufbewahrt und danach gelöscht. Bestehende Berichte können auf Anfrage gelöscht werden.","Gesetzlich erforderliche Zahlungsnachweise werden getrennt für die vorgeschriebene Dauer aufbewahrt und danach vernichtet."],
      refundTitle: "Erstattungen und Datenaufbewahrung", refunds: ["Bei Erstattung oder Stornierung eines lebenslangen Passes enden die Bezahlfunktionen und die kostenlosen Limits gelten wieder.","Zusatzplatz-Transaktionen und Bereichsdaten werden nicht sofort gelöscht. Der Zugriff überzähliger Mitglieder kann ausgesetzt werden, ohne Daten zu löschen.","Nach Wiederherstellung der Kapazität werden ausgesetzte Mitglieder in Beitrittsreihenfolge reaktiviert. Kontolöschungen werden getrennt behandelt."],
      processorsTitle: "4. Weitergabe und Auftragsverarbeitung", processorsIntro: "Der Dienst verkauft keine personenbezogenen Daten und nutzt sie nicht für Werbetracking. Die folgenden Anbieter verarbeiten Daten für den Betrieb.",
      processorHeaders: ["Auftragsverarbeiter","Aufgabe","Speicherort"], processorTasks: [["Datenbank und Authentifizierungsserver","Region Seoul, Korea (AWS)"],["Versand erlaubter Push-Benachrichtigungen","USA"],["Social Login, In-App-Käufe und Belegprüfung","Nach Richtlinie des jeweiligen Anbieters"],["Anonyme Produktstatistik mit ausdrücklicher Einwilligung","USA und weitere Dienstregionen"],["Fehler- und Absturzberichte","USA und weitere Dienstregionen"]],
      rightsTitle: "5. Deine Rechte", rights: "Die Produktanalyse ist standardmäßig aus. Vor deiner Auswahl initialisieren wir PostHog nicht und senden keine Statistik. Die Auswahl wird in Konto und Gerät gespeichert und nach Neuinstallation oder Gerätewechsel beachtet. Du kannst sie jederzeit deaktivieren; danach werden keine neuen Ereignisse gesendet. Profilbearbeitung und Kontolöschung sind ebenfalls in den Einstellungen möglich. Ohne App-Zugriff nutze den <a href=\"./delete-account.html\">Löschantrag im Web</a>.",
      officerTitle: "6. Datenschutzverantwortlicher und Kontakt", officer: "Verantwortlicher: Park Byungjun", contact: "Kontakt", support: "DayRipple-Supportseite",
      changesTitle: "7. Änderungen", changes: "Änderungen teilen wir über die App oder auf dieser Seite mit.",
    },
    fr: {
      heading: "Politique de confidentialité de DayRipple", effective: "Date d’entrée en vigueur : 15 juillet 2026",
      intro: "DayRipple (le « Service ») traite vos données personnelles avec soin et respecte la législation applicable, notamment la loi coréenne sur la protection des informations personnelles.",
      deletionTitle: "Suppression du compte et des données", deletion: "Vous pouvez supprimer immédiatement votre compte dans <b>Réglages → Compte → Supprimer le compte</b>. Si vous ne pouvez pas utiliser l’app, utilisez la <a href=\"./delete-account.html\">page de demande de suppression</a>.",
      collectTitle: "1. Données personnelles collectées", headers: ["Catégorie","Données","Moment de la collecte"],
      rows: [["Compte","Adresse e-mail, identifiants chiffrés, pseudonyme et ID utilisateur","À l’inscription ou à la connexion sociale"],["Réglage facultatif","Acceptation ou refus de l’analyse d’amélioration","Lors de votre choix"],["Utilisation","Événements, anniversaires／Jours J, tâches, noms des espaces et membres","Lors de votre saisie"],["Appareil et notifications","Jeton push, système, langue, fuseau horaire, autorisations par type et dernière utilisation","À l’activation des notifications ou à l’utilisation"],["Paiement","ID de transaction et de produit, achat／remboursement, identifiant aléatoire de liaison","Lors d’un achat intégré"],["Statistiques anonymes","Noms et catégories normalisées des actions principales terminées, version, système et identifiant anonyme d’installation","Après autorisation explicite"],["Erreurs","Version, système, type d’erreur／emplacement du code et ID interne","En cas d’erreur ou de plantage"]],
      payment: "Les paiements sont traités par l’Apple App Store ou Google Play. Le Service ne collecte ni ne conserve les numéros de carte, de compte bancaire ou autres données de paiement.",
      excluded: "Les statistiques PostHog et rapports Sentry ne contiennent ni e-mail, pseudonyme, nom d’espace, type de relation, code／lien d’invitation, titre ou note d’événement, d’anniversaire et de tâche, ni ID ou jeton de paiement. Nous ne collectons pas d’identifiant publicitaire, de localisation, de contacts, de photos ou d’activité dans les apps et sites d’autres entreprises et n’utilisons ni enregistrement d’écran ni relecture de session.",
      purposesTitle: "2. Finalités", purposes: ["Identification et connexion","Partage d’événements, anniversaires et tâches entre membres invités","Envoi de rappels et notifications d’activité","Avec autorisation distincte, rappels adaptés à la langue, au fuseau et à l’état de l’espace","Vérification du pass à vie／des places supplémentaires et ajustement après remboursement ou annulation","Amélioration des fonctions par analyse anonyme, uniquement avec autorisation explicite","Traitement des erreurs et prévention des doubles débits ou usages frauduleux"],
      retentionTitle: "3. Conservation et suppression", retention: ["À la suppression du compte, nous effaçons rapidement le compte, le profil, les appartenances, les jetons, le choix d’analyse et vos contenus.","Les espaces utilisés seul sont entièrement supprimés. Les espaces partagés sont transférés aux membres restants, mais vos contenus sont effacés.","Les droits d’achat d’un espace partagé peuvent être maintenus pour protéger les autres membres, sans lien avec le compte supprimé.","PostHog est utilisé de façon anonyme, sans ID de compte ni profil personnel. À la déconnexion ou suppression, l’identifiant anonyme est réinitialisé et les statistiques agrégées ne sont pas réassociées.","Les rapports Sentry sont conservés uniquement pendant la durée nécessaire au fonctionnement puis supprimés. Leur suppression peut être demandée.","Les justificatifs de paiement imposés par la loi sont conservés séparément pendant la durée légale puis détruits."],
      refundTitle: "Remboursements et conservation", refunds: ["Si un pass à vie est remboursé ou annulé, les fonctions payantes cessent et les limites gratuites s’appliquent de nouveau.","Les opérations de places supplémentaires et les données de l’espace ne sont pas supprimées immédiatement. L’accès des membres au-delà de la capacité peut être suspendu sans effacer leurs données.","Lorsque la capacité est rétablie par un droit valide, les membres suspendus sont réintégrés dans l’ordre d’arrivée. La suppression du compte est traitée séparément."],
      processorsTitle: "4. Partage et sous-traitance", processorsIntro: "Le Service ne vend pas les données personnelles et ne les utilise pas pour le suivi publicitaire. Les sociétés suivantes les traitent pour son fonctionnement.",
      processorHeaders: ["Sous-traitant","Mission","Lieu"], processorTasks: [["Base de données et serveur d’authentification","Région de Séoul, Corée (AWS)"],["Envoi des notifications push autorisées","États-Unis"],["Connexion sociale, achats intégrés et validation des reçus","Selon la politique de chaque société"],["Statistiques produit anonymes avec autorisation explicite","États-Unis et autres régions du service"],["Rapports d’erreur et de plantage","États-Unis et autres régions du service"]],
      rightsTitle: "5. Vos droits", rights: "L’analyse d’amélioration est désactivée par défaut. Nous n’initialisons pas PostHog et n’envoyons aucune statistique avant votre choix. Celui-ci est conservé sur le compte et l’appareil et respecté après réinstallation ou changement d’appareil. Vous pouvez le désactiver à tout moment ; aucun nouvel événement ne sera alors envoyé. Le profil et le compte peuvent aussi être modifiés ou supprimés dans les réglages. Sans accès à l’app, utilisez la <a href=\"./delete-account.html\">demande web</a>.",
      officerTitle: "6. Responsable de la confidentialité et contact", officer: "Responsable : Park Byungjun", contact: "Contact", support: "Page d’assistance DayRipple",
      changesTitle: "7. Modifications", changes: "Toute modification sera annoncée dans l’app ou sur cette page.",
    },
    id: {
      heading: "Kebijakan Privasi DayRipple", effective: "Berlaku sejak: 15 Juli 2026",
      intro: "DayRipple (“Layanan”) menangani informasi pribadi kamu dengan hati-hati dan mematuhi hukum yang berlaku, termasuk Undang-Undang Perlindungan Informasi Pribadi Korea.",
      deletionTitle: "Hapus akun dan data", deletion: "Kamu dapat langsung menghapusnya melalui <b>Pengaturan → Akun → Hapus akun</b>. Jika tidak dapat menggunakan aplikasi, gunakan <a href=\"./delete-account.html\">halaman permintaan penghapusan</a>.",
      collectTitle: "1. Informasi pribadi yang kami kumpulkan", headers: ["Kategori","Data","Waktu pengumpulan"],
      rows: [["Akun","Email, kredensial terenkripsi, nama panggilan, ID pengguna","Saat mendaftar atau login sosial"],["Pengaturan opsional","Persetujuan atau penolakan analitik peningkatan produk","Saat kamu memilih"],["Penggunaan layanan","Jadwal, hari jadi／Hari-H, tugas, nama ruang, dan anggota","Saat kamu memasukkannya"],["Perangkat dan notifikasi","Token push, sistem operasi, bahasa, zona waktu, izin per jenis, waktu penggunaan terakhir","Saat mengaktifkan notifikasi atau memakai aplikasi"],["Pembayaran","ID transaksi dan produk, status pembelian／pengembalian dana, pengenal acak untuk menautkan pembelian","Saat pembelian dalam aplikasi"],["Statistik anonim","Nama dan kategori baku tindakan utama yang selesai, versi, sistem operasi, pengenal instalasi anonim","Setelah izin tegas"],["Kesalahan","Versi, sistem operasi, jenis kesalahan／lokasi kode, ID pengguna internal","Saat terjadi kesalahan atau crash"]],
      payment: "Pembayaran diproses oleh Apple App Store atau Google Play. Layanan tidak mengumpulkan atau menyimpan nomor kartu, rekening bank, atau informasi metode pembayaran lainnya.",
      excluded: "Statistik PostHog dan laporan Sentry tidak memuat email, nama panggilan, nama ruang, jenis hubungan, kode／tautan undangan, judul atau catatan jadwal, hari jadi, dan tugas, maupun ID atau token pembayaran. Kami tidak mengumpulkan pengenal iklan, lokasi, kontak, foto, atau aktivitas di aplikasi dan situs perusahaan lain; kami juga tidak menggunakan rekaman layar atau pemutaran ulang sesi.",
      purposesTitle: "2. Tujuan penggunaan", purposes: ["Identifikasi pengguna dan login","Berbagi jadwal, hari jadi, dan tugas antaranggota yang diundang","Mengirim pengingat dan notifikasi aktivitas anggota","Dengan izin terpisah, mengirim pengingat sesuai bahasa, zona waktu, dan status ruang","Memverifikasi akses seumur hidup／anggota tambahan dan menyesuaikan akses setelah pengembalian dana atau pembatalan","Meningkatkan fitur melalui analitik anonim hanya dengan izin tegas","Menangani kesalahan serta mencegah tagihan ganda atau penyalahgunaan"],
      retentionTitle: "3. Penyimpanan dan penghapusan", retention: ["Saat akun dihapus, kami segera menghapus akun, profil, keanggotaan, token, pilihan analitik, dan konten yang kamu buat.","Ruang yang dipakai sendiri dihapus seluruhnya. Ruang bersama dialihkan kepada anggota yang tersisa, tetapi konten buatanmu dihapus.","Hak pembelian ruang bersama dapat tetap ada untuk melindungi anggota lain, tetapi kaitannya dengan akun yang dihapus dilepas.","PostHog digunakan secara anonim tanpa membuat ID akun atau profil pribadi. Saat logout atau menghapus akun, pengenal anonim perangkat direset dan statistik agregat tidak ditautkan kembali.","Laporan Sentry disimpan hanya selama diperlukan untuk operasional lalu dihapus. Kamu dapat meminta penghapusan laporan yang sudah ada.","Catatan pembayaran yang wajib disimpan menurut hukum dipisahkan selama jangka waktu yang ditetapkan lalu dimusnahkan."],
      refundTitle: "Pengembalian dana dan penyimpanan data", refunds: ["Jika akses seumur hidup dikembalikan atau dibatalkan, fitur berbayar berhenti dan batas gratis berlaku lagi.","Catatan transaksi anggota tambahan dan data ruang tidak langsung dihapus. Akses anggota yang melebihi kapasitas dapat ditangguhkan tanpa menghapus data.","Saat kapasitas pulih melalui hak yang valid, anggota yang ditangguhkan dipulihkan menurut urutan bergabung. Penghapusan akun diproses terpisah."],
      processorsTitle: "4. Berbagi dan pemrosesan oleh pihak lain", processorsIntro: "Layanan tidak menjual informasi pribadi atau menggunakannya untuk pelacakan iklan. Perusahaan berikut memproses data untuk menjalankan Layanan.",
      processorHeaders: ["Pemroses","Tugas","Lokasi"], processorTasks: [["Basis data dan server autentikasi","Wilayah Seoul, Korea (AWS)"],["Mengirim notifikasi push yang diizinkan","Amerika Serikat"],["Login sosial, pembelian dalam aplikasi, dan verifikasi tanda terima","Menurut kebijakan masing-masing perusahaan"],["Statistik produk anonim dengan izin tegas","Amerika Serikat dan wilayah layanan lainnya"],["Laporan kesalahan dan crash","Amerika Serikat dan wilayah layanan lainnya"]],
      rightsTitle: "5. Hak kamu", rights: "Analitik peningkatan produk secara bawaan dinonaktifkan. Kami tidak mengaktifkan PostHog atau mengirim statistik sebelum kamu memilih. Pilihan disimpan di akun dan perangkat serta tetap dihormati setelah instal ulang atau ganti perangkat. Kamu dapat menonaktifkannya kapan saja; setelah itu tidak ada event PostHog baru. Profil dan akun juga dapat diedit atau dihapus dari Pengaturan. Jika aplikasi tidak dapat diakses, gunakan <a href=\"./delete-account.html\">permintaan penghapusan melalui web</a>.",
      officerTitle: "6. Penanggung jawab privasi dan kontak", officer: "Penanggung jawab: Park Byungjun", contact: "Kontak", support: "Halaman bantuan DayRipple",
      changesTitle: "7. Perubahan kebijakan", changes: "Jika kebijakan ini berubah, kami akan memberi tahu melalui aplikasi atau halaman ini.",
    },
    it: {
      heading: "Informativa sulla privacy di DayRipple", effective: "In vigore dal: 15 luglio 2026",
      intro: "DayRipple (il «Servizio») tratta i tuoi dati personali con cura e rispetta le leggi applicabili, inclusa la legge coreana sulla protezione dei dati personali.",
      deletionTitle: "Eliminare account e dati", deletion: "Puoi eliminare subito il tuo account da <b>Impostazioni → Account → Elimina account</b>. Se non riesci a usare l'app, utilizza la <a href=\"./delete-account.html\">pagina per le richieste di eliminazione</a>.",
      collectTitle: "1. Dati personali raccolti", headers: ["Categoria","Dati","Momento"],
      rows: [["Dati dell'account","Indirizzo email, credenziali di accesso cifrate, nome visualizzato, ID utente","Alla registrazione o al login social"],["Impostazione facoltativa","Consenso o rifiuto dell'analisi di prodotto","Al momento della tua scelta"],["Dati di utilizzo","Eventi, anniversari／D-day, cose da fare, nomi degli spazi e membri","Quando li inserisci"],["Dispositivo e notifiche","Token push, sistema operativo, lingua, fuso orario, permessi per tipo, ultimo utilizzo","Quando attivi le notifiche o usi l'app"],["Pagamento","ID transazione e prodotto, acquisto／rimborso, identificatore casuale per l'abbinamento","All'acquisto in-app"],["Statistiche anonime","Nomi e categorie normalizzate delle azioni principali completate, versione dell'app, sistema operativo, identificatore anonimo di installazione","Dopo consenso esplicito"],["Errori","Versione dell'app, sistema operativo, tipo di errore／punto nel codice, ID utente interno","In caso di errori o crash"]],
      payment: "I pagamenti sono gestiti dall'App Store di Apple o da Google Play. Il Servizio non raccoglie né conserva dati di carte o coordinate bancarie.",
      excluded: "Le statistiche PostHog e i report Sentry non contengono email, nomi visualizzati, nomi degli spazi, tipo di relazione, codici／link di invito, titoli o note di eventi, anniversari e cose da fare, né ID o token di pagamento. Non raccogliamo identificatori pubblicitari, posizione, contatti, foto o attività in app e siti di terzi e non usiamo registrazioni dello schermo o riproduzioni di sessione.",
      purposesTitle: "2. Finalità", purposes: ["Identificazione e accesso","Condivisione di eventi, anniversari e cose da fare tra i membri invitati","Invio di promemoria e notifiche di attività","Con permesso separato: inviti a tornare in base a lingua, fuso orario e stato dello spazio","Verifica del pass a vita／posti aggiuntivi e adeguamento dell'accesso in caso di rimborso o annullamento","Miglioramento delle funzioni tramite analisi anonima solo con consenso esplicito","Risoluzione degli errori e protezione da doppi addebiti o abusi"],
      retentionTitle: "3. Conservazione ed eliminazione", retention: ["All'eliminazione dell'account rimuoviamo senza indugio account, profilo, appartenenze, token, scelta sull'analisi e i tuoi contenuti.","Gli spazi usati da solo vengono eliminati completamente. Gli spazi condivisi passano ai membri rimanenti; i tuoi contenuti vengono eliminati.","I diritti d'acquisto di uno spazio condiviso possono restare a tutela degli altri membri, ma vengono scollegati dall'account eliminato.","PostHog opera in forma anonima e non crea ID account né profili personali. In caso di disconnessione o eliminazione l'identificatore anonimo del dispositivo viene azzerato; i dati aggregati non vengono riassociati.","I report Sentry sono conservati solo per il tempo operativamente necessario e poi eliminati. I report esistenti possono essere eliminati su richiesta.","Le prove di pagamento richieste per legge sono conservate separatamente per la durata prevista e poi distrutte."],
      refundTitle: "Rimborsi e conservazione dei dati", refunds: ["In caso di rimborso o annullamento di un pass a vita, le funzioni a pagamento terminano e tornano validi i limiti gratuiti.","Le transazioni dei posti aggiuntivi e i dati dello spazio non vengono eliminati subito. L'accesso dei membri eccedenti può essere sospeso senza eliminare dati.","Dopo il ripristino della capacità, i membri sospesi vengono riattivati nell'ordine di ingresso. Le eliminazioni di account sono gestite separatamente."],
      processorsTitle: "4. Comunicazione e responsabili del trattamento", processorsIntro: "Il Servizio non vende dati personali e non li usa per il tracciamento pubblicitario. I fornitori seguenti trattano dati per il funzionamento.",
      processorHeaders: ["Responsabile del trattamento","Attività","Luogo di conservazione"], processorTasks: [["Database e server di autenticazione","Regione di Seoul, Corea (AWS)"],["Invio delle notifiche push autorizzate","Stati Uniti"],["Login social, acquisti in-app e verifica delle ricevute","Secondo le policy del rispettivo fornitore"],["Statistiche di prodotto anonime previo consenso esplicito","Stati Uniti e altre regioni del servizio"],["Report di errore e crash","Stati Uniti e altre regioni del servizio"]],
      rightsTitle: "5. I tuoi diritti", rights: "L'analisi di prodotto è disattivata per impostazione predefinita. Prima della tua scelta non inizializziamo PostHog e non inviamo statistiche. La scelta viene salvata nell'account e sul dispositivo e rispettata dopo una reinstallazione o un cambio di dispositivo. Puoi disattivarla in qualsiasi momento; da quel momento non vengono inviati nuovi eventi. Anche la modifica del profilo e l'eliminazione dell'account sono disponibili nelle impostazioni. Se non hai accesso all'app, usa la <a href=\"./delete-account.html\">richiesta di eliminazione sul web</a>.",
      officerTitle: "6. Titolare del trattamento e contatti", officer: "Titolare del trattamento: Park Byungjun", contact: "Contatti", support: "Pagina di assistenza DayRipple",
      changesTitle: "7. Modifiche", changes: "Comunichiamo le modifiche tramite l'app o su questa pagina.",
    },
    nl: {
      heading: "Privacybeleid van DayRipple", effective: "Geldig vanaf: 15 juli 2026",
      intro: "DayRipple (de 'Dienst') gaat zorgvuldig om met je persoonsgegevens en houdt zich aan de toepasselijke wetgeving, waaronder de Koreaanse wet op de bescherming van persoonsgegevens.",
      deletionTitle: "Account en gegevens verwijderen", deletion: "Je kunt je account direct verwijderen via <b>Instellingen → Account → Account verwijderen</b>. Als je de app niet kunt gebruiken, gebruik dan de <a href=\"./delete-account.html\">pagina voor verwijderingsverzoeken</a>.",
      collectTitle: "1. Verzamelde persoonsgegevens", headers: ["Categorie","Gegevens","Moment"],
      rows: [["Accountgegevens","E-mailadres, versleutelde inloggegevens, weergavenaam, gebruikers-ID","Bij registratie of social login"],["Optionele instelling","Toestemming of weigering voor productanalyse","Bij jouw keuze"],["Gebruiksgegevens","Afspraken, jubilea／D-days, taken, namen van ruimtes en leden","Wanneer je ze invoert"],["Apparaat en meldingen","Pushtoken, besturingssysteem, taal, tijdzone, rechten per type, laatste gebruik","Bij het inschakelen van meldingen of gebruik van de app"],["Betaling","Transactie- en product-ID, aankoop／terugbetaling, willekeurige identificatie voor koppeling","Bij een in-app-aankoop"],["Anonieme statistiek","Namen en genormaliseerde categorieën van voltooide hoofdacties, app-versie, besturingssysteem, anonieme installatie-identificatie","Na uitdrukkelijke toestemming"],["Fouten","App-versie, besturingssysteem, fouttype／plek in de code, interne gebruikers-ID","Bij fouten of crashes"]],
      payment: "Betalingen worden verwerkt door de Apple App Store of Google Play. De Dienst verzamelt of bewaart geen kaart- of bankgegevens.",
      excluded: "PostHog-statistieken en Sentry-rapporten bevatten geen e-mailadres, weergavenaam, naam van een ruimte, relatietype, uitnodigingscodes／links, titels of notities van afspraken, jubilea en taken, en geen betaal-ID's of tokens. We verzamelen geen advertentie-ID's, locatie, contacten, foto's of activiteit in apps en websites van derden en gebruiken geen schermopnames of sessieweergaven.",
      purposesTitle: "2. Doeleinden", purposes: ["Identificatie en inloggen","Delen van afspraken, jubilea en taken tussen uitgenodigde leden","Versturen van herinneringen en activiteitsmeldingen","Met aparte toestemming: terugkeerherinneringen passend bij taal, tijdzone en status van de ruimte","Controle van de levenslange pas／extra plaatsen en aanpassing van toegang bij terugbetaling of annulering","Functieverbetering via anonieme analyse, uitsluitend met uitdrukkelijke toestemming","Foutoplossing en bescherming tegen dubbele afschrijvingen of misbruik"],
      retentionTitle: "3. Bewaring en verwijdering", retention: ["Bij accountverwijdering verwijderen we onverwijld account, profiel, lidmaatschappen, tokens, analysekeuze en je inhoud.","Ruimtes die je alleen gebruikte worden volledig verwijderd. Gedeelde ruimtes gaan over op de resterende leden; jouw inhoud wordt verwijderd.","Aankooprechten van een gedeelde ruimte kunnen ter bescherming van andere leden blijven bestaan, maar worden losgekoppeld van het verwijderde account.","PostHog werkt anoniem en maakt geen account-ID's of persoonlijke profielen aan. Bij uitloggen of verwijderen wordt de anonieme apparaatidentificatie gereset; geaggregeerde gegevens worden niet opnieuw gekoppeld.","Sentry-rapporten worden alleen zolang bewaard als operationeel nodig is en daarna verwijderd. Bestaande rapporten kunnen op verzoek worden verwijderd.","Wettelijk vereiste betaalbewijzen worden apart bewaard gedurende de voorgeschreven termijn en daarna vernietigd."],
      refundTitle: "Terugbetalingen en gegevensbewaring", refunds: ["Bij terugbetaling of annulering van een levenslange pas eindigen de betaalde functies en gelden de gratis limieten weer.","Transacties voor extra plaatsen en gegevens van de ruimte worden niet direct verwijderd. De toegang van overtollige leden kan worden opgeschort zonder gegevens te verwijderen.","Na herstel van de capaciteit worden opgeschorte leden in volgorde van toetreding weer geactiveerd. Accountverwijderingen worden apart afgehandeld."],
      processorsTitle: "4. Verstrekking en verwerkers", processorsIntro: "De Dienst verkoopt geen persoonsgegevens en gebruikt ze niet voor advertentietracking. De volgende aanbieders verwerken gegevens voor de werking.",
      processorHeaders: ["Verwerker","Taak","Opslaglocatie"], processorTasks: [["Database en authenticatieserver","Regio Seoul, Korea (AWS)"],["Versturen van toegestane pushmeldingen","Verenigde Staten"],["Social login, in-app-aankopen en bonverificatie","Volgens het beleid van de betreffende aanbieder"],["Anonieme productstatistiek na uitdrukkelijke toestemming","Verenigde Staten en andere serviceregio's"],["Fout- en crashrapporten","Verenigde Staten en andere serviceregio's"]],
      rightsTitle: "5. Jouw rechten", rights: "Productanalyse staat standaard uit. Vóór jouw keuze initialiseren we PostHog niet en versturen we geen statistiek. De keuze wordt in je account en op je apparaat bewaard en na een herinstallatie of apparaatwissel gerespecteerd. Je kunt het altijd uitzetten; daarna worden er geen nieuwe gebeurtenissen verstuurd. Profiel bewerken en account verwijderen kan eveneens in de instellingen. Zonder toegang tot de app gebruik je het <a href=\"./delete-account.html\">verwijderingsverzoek op het web</a>.",
      officerTitle: "6. Verwerkingsverantwoordelijke en contact", officer: "Verwerkingsverantwoordelijke: Park Byungjun", contact: "Contact", support: "DayRipple-ondersteuningspagina",
      changesTitle: "7. Wijzigingen", changes: "Wijzigingen melden we via de app of op deze pagina.",
    },
    th: {
      heading: "นโยบายความเป็นส่วนตัวของ DayRipple", effective: "มีผลตั้งแต่: 15 กรกฎาคม 2026",
      intro: "DayRipple (“บริการ”) ดูแลข้อมูลส่วนบุคคลของคุณอย่างระมัดระวัง และปฏิบัติตามกฎหมายที่เกี่ยวข้อง รวมถึงกฎหมายคุ้มครองข้อมูลส่วนบุคคลของเกาหลี",
      deletionTitle: "ลบบัญชีและข้อมูล", deletion: "คุณลบบัญชีได้ทันทีที่ <b>ตั้งค่า → บัญชี → ลบบัญชี</b> หากใช้แอปไม่ได้ ให้ใช้<a href=\"./delete-account.html\">หน้าคำขอลบบัญชี</a>",
      collectTitle: "1. ข้อมูลส่วนบุคคลที่เก็บรวบรวม", headers: ["ประเภท","ข้อมูล","ช่วงเวลา"],
      rows: [["ข้อมูลบัญชี","อีเมล ข้อมูลเข้าสู่ระบบที่เข้ารหัส ชื่อที่แสดง รหัสผู้ใช้","เมื่อสมัครหรือเข้าสู่ระบบด้วยโซเชียล"],["การตั้งค่าที่เลือกได้","การยินยอมหรือปฏิเสธการวิเคราะห์การใช้งาน","เมื่อคุณเลือก"],["ข้อมูลการใช้งาน","กิจกรรม วันครบรอบ／D-day สิ่งที่ต้องทำ ชื่อพื้นที่และสมาชิก","เมื่อคุณกรอกข้อมูล"],["อุปกรณ์และการแจ้งเตือน","โทเค็นการแจ้งเตือน ระบบปฏิบัติการ ภาษา เขตเวลา สิทธิ์แต่ละประเภท การใช้งานล่าสุด","เมื่อเปิดการแจ้งเตือนหรือใช้แอป"],["การชำระเงิน","รหัสธุรกรรมและสินค้า การซื้อ／การคืนเงิน ตัวระบุแบบสุ่มสำหรับการจับคู่","เมื่อซื้อในแอป"],["สถิติแบบไม่ระบุตัวตน","ชื่อและหมวดหมู่ที่ปรับให้เป็นมาตรฐานของการกระทำหลักที่ทำสำเร็จ เวอร์ชันแอป ระบบปฏิบัติการ ตัวระบุการติดตั้งแบบไม่ระบุตัวตน","หลังได้รับความยินยอมอย่างชัดแจ้ง"],["ข้อผิดพลาด","เวอร์ชันแอป ระบบปฏิบัติการ ประเภทข้อผิดพลาด／ตำแหน่งในโค้ด รหัสผู้ใช้ภายใน","เมื่อเกิดข้อผิดพลาดหรือแอปหยุดทำงาน"]],
      payment: "การชำระเงินดำเนินการโดย Apple App Store หรือ Google Play บริการไม่เก็บหรือบันทึกข้อมูลบัตรหรือบัญชีธนาคาร",
      excluded: "สถิติของ PostHog และรายงานของ Sentry ไม่มีอีเมล ชื่อที่แสดง ชื่อพื้นที่ ประเภทความสัมพันธ์ รหัส／ลิงก์คำเชิญ ชื่อหรือบันทึกของกิจกรรม วันครบรอบ และสิ่งที่ต้องทำ รวมถึงไม่มีรหัสหรือโทเค็นการชำระเงิน เราไม่เก็บตัวระบุโฆษณา ตำแหน่งที่ตั้ง รายชื่อผู้ติดต่อ รูปภาพ หรือกิจกรรมในแอปและเว็บไซต์ของผู้อื่น และไม่ใช้การบันทึกหน้าจอหรือการเล่นซ้ำเซสชัน",
      purposesTitle: "2. วัตถุประสงค์", purposes: ["การระบุตัวตนและการเข้าสู่ระบบ","การแชร์กิจกรรม วันครบรอบ และสิ่งที่ต้องทำระหว่างสมาชิกที่ได้รับเชิญ","การส่งการแจ้งเตือนและการเตือนความเคลื่อนไหว","เมื่อได้รับอนุญาตแยกต่างหาก: การเชิญให้กลับมาใช้งานตามภาษา เขตเวลา และสถานะของพื้นที่","การตรวจสอบแพ็กเกจตลอดชีพ／สิทธิ์เพิ่มเติม และการปรับสิทธิ์เข้าถึงเมื่อมีการคืนเงินหรือยกเลิก","การปรับปรุงฟีเจอร์ผ่านการวิเคราะห์แบบไม่ระบุตัวตน เฉพาะเมื่อได้รับความยินยอมอย่างชัดแจ้ง","การแก้ไขข้อผิดพลาดและการป้องกันการเรียกเก็บเงินซ้ำหรือการใช้งานโดยมิชอบ"],
      retentionTitle: "3. การเก็บรักษาและการลบ", retention: ["เมื่อลบบัญชี เราจะลบบัญชี โปรไฟล์ การเป็นสมาชิก โทเค็น การเลือกเรื่องการวิเคราะห์ และเนื้อหาของคุณโดยไม่ชักช้า","พื้นที่ที่ใช้คนเดียวจะถูกลบทั้งหมด พื้นที่ที่แชร์จะถูกโอนให้สมาชิกที่เหลือ ส่วนเนื้อหาของคุณจะถูกลบ","สิทธิ์การซื้อของพื้นที่ที่แชร์อาจยังคงอยู่เพื่อคุ้มครองสมาชิกคนอื่น แต่จะถูกตัดการเชื่อมโยงกับบัญชีที่ถูกลบ","PostHog ทำงานแบบไม่ระบุตัวตนและไม่สร้างรหัสบัญชีหรือโปรไฟล์ส่วนบุคคล เมื่อออกจากระบบหรือลบบัญชี ตัวระบุอุปกรณ์แบบไม่ระบุตัวตนจะถูกรีเซ็ต ข้อมูลที่รวมไว้แล้วจะไม่ถูกนำกลับมาเชื่อมโยงอีก","รายงานของ Sentry จะเก็บไว้เท่าที่จำเป็นต่อการดำเนินงานแล้วจึงลบ รายงานที่มีอยู่สามารถลบได้เมื่อมีการร้องขอ","หลักฐานการชำระเงินที่กฎหมายกำหนดจะถูกเก็บแยกไว้ตามระยะเวลาที่กำหนดแล้วจึงทำลาย"],
      refundTitle: "การคืนเงินและการเก็บรักษาข้อมูล", refunds: ["เมื่อมีการคืนเงินหรือยกเลิกแพ็กเกจตลอดชีพ ฟีเจอร์แบบชำระเงินจะสิ้นสุดลงและขีดจำกัดแบบฟรีจะกลับมามีผล","ธุรกรรมสิทธิ์สมาชิกเพิ่มและข้อมูลของพื้นที่จะไม่ถูกลบทันที การเข้าถึงของสมาชิกส่วนเกินอาจถูกพักไว้โดยไม่ลบข้อมูล","หลังจากความจุกลับคืนมา สมาชิกที่ถูกพักไว้จะถูกเปิดใช้งานอีกครั้งตามลำดับการเข้าร่วม การลบบัญชีจะดำเนินการแยกต่างหาก"],
      processorsTitle: "4. การเปิดเผยและผู้ประมวลผลข้อมูล", processorsIntro: "บริการไม่ขายข้อมูลส่วนบุคคลและไม่ใช้เพื่อการติดตามโฆษณา ผู้ให้บริการต่อไปนี้ประมวลผลข้อมูลเพื่อการดำเนินงาน",
      processorHeaders: ["ผู้ประมวลผลข้อมูล","หน้าที่","สถานที่จัดเก็บ"], processorTasks: [["ฐานข้อมูลและเซิร์ฟเวอร์ยืนยันตัวตน","ภูมิภาคโซล ประเทศเกาหลี (AWS)"],["การส่งการแจ้งเตือนที่ได้รับอนุญาต","สหรัฐอเมริกา"],["การเข้าสู่ระบบด้วยโซเชียล การซื้อในแอป และการตรวจสอบใบเสร็จ","ตามนโยบายของผู้ให้บริการแต่ละราย"],["สถิติการใช้งานแบบไม่ระบุตัวตนเมื่อได้รับความยินยอมอย่างชัดแจ้ง","สหรัฐอเมริกาและภูมิภาคให้บริการอื่น"],["รายงานข้อผิดพลาดและการหยุดทำงาน","สหรัฐอเมริกาและภูมิภาคให้บริการอื่น"]],
      rightsTitle: "5. สิทธิ์ของคุณ", rights: "การวิเคราะห์การใช้งานถูกปิดไว้เป็นค่าเริ่มต้น ก่อนที่คุณจะเลือก เราจะไม่เริ่มต้นใช้งาน PostHog และไม่ส่งสถิติใด ๆ การเลือกของคุณจะถูกบันทึกไว้ในบัญชีและอุปกรณ์ และจะยังมีผลหลังติดตั้งใหม่หรือเปลี่ยนเครื่อง คุณปิดได้ทุกเมื่อ หลังจากนั้นจะไม่มีการส่งเหตุการณ์ใหม่ การแก้ไขโปรไฟล์และการลบบัญชีก็ทำได้ในหน้าตั้งค่าเช่นกัน หากเข้าใช้แอปไม่ได้ ให้ใช้<a href=\"./delete-account.html\">คำขอลบบัญชีบนเว็บ</a>",
      officerTitle: "6. ผู้รับผิดชอบด้านการคุ้มครองข้อมูลและการติดต่อ", officer: "ผู้รับผิดชอบ: Park Byungjun", contact: "ติดต่อเรา", support: "หน้าความช่วยเหลือ DayRipple",
      changesTitle: "7. การเปลี่ยนแปลง", changes: "เราจะแจ้งการเปลี่ยนแปลงผ่านแอปหรือบนหน้านี้",
    },
    tr: {
      heading: "DayRipple Gizlilik Politikası", effective: "Yürürlük tarihi: 15 Temmuz 2026",
      intro: "DayRipple (“Hizmet”), kişisel verilerini özenle işler ve Kore Kişisel Verilerin Korunması Kanunu dâhil olmak üzere geçerli mevzuata uyar.",
      deletionTitle: "Hesabı ve verileri silme", deletion: "Hesabını <b>Ayarlar → Hesap → Hesabı sil</b> üzerinden hemen silebilirsin. Uygulamayı kullanamıyorsan <a href=\"./delete-account.html\">silme talebi sayfasını</a> kullan.",
      collectTitle: "1. Toplanan kişisel veriler", headers: ["Kategori","Veri","Zaman"],
      rows: [["Hesap verileri","E-posta adresi, şifrelenmiş oturum bilgileri, görünen ad, kullanıcı kimliği","Kayıt veya sosyal giriş sırasında"],["İsteğe bağlı ayar","Ürün analizine onay ya da ret","Seçimini yaptığında"],["Kullanım verileri","Etkinlikler, yıldönümleri／D-day'ler, yapılacak işler, alan adları ve üyeler","Bunları girdiğinde"],["Cihaz ve bildirimler","Bildirim jetonu, işletim sistemi, dil, saat dilimi, türüne göre izinler, son kullanım","Bildirimleri açtığında veya uygulamayı kullandığında"],["Ödeme","İşlem ve ürün kimliği, satın alma／iade, eşleştirme için rastgele tanımlayıcı","Uygulama içi satın alma sırasında"],["Anonim istatistik","Tamamlanan ana işlemlerin adları ve normalleştirilmiş kategorileri, uygulama sürümü, işletim sistemi, anonim kurulum tanımlayıcısı","Açık rıza sonrasında"],["Hatalar","Uygulama sürümü, işletim sistemi, hata türü／koddaki konum, dahili kullanıcı kimliği","Hata veya çökme durumunda"]],
      payment: "Ödemeler Apple App Store veya Google Play tarafından işlenir. Hizmet, kart veya banka bilgisi toplamaz ve saklamaz.",
      excluded: "PostHog istatistikleri ve Sentry raporları e-posta, görünen ad, alan adı, ilişki türü, davet kodları／bağlantıları, etkinliklerin, yıldönümlerinin ve yapılacakların başlık veya notlarını, ödeme kimliklerini ya da jetonlarını içermez. Reklam kimlikleri, konum, kişiler, fotoğraflar veya üçüncü tarafların uygulama ve sitelerindeki etkinlikler toplanmaz; ekran kaydı veya oturum tekrarı kullanılmaz.",
      purposesTitle: "2. Amaçlar", purposes: ["Kimlik doğrulama ve oturum açma","Davet edilen üyeler arasında etkinlik, yıldönümü ve yapılacakların paylaşımı","Hatırlatıcı ve etkinlik bildirimlerinin gönderilmesi","Ayrı izin verilmişse: dil, saat dilimi ve alan durumuna uygun geri dönüş hatırlatmaları","Ömür boyu paket／ek koltuk doğrulaması ve iade ya da iptal durumunda erişimin uyarlanması","Yalnızca açık rıza ile anonim analiz yoluyla işlevlerin iyileştirilmesi","Hata giderme ve mükerrer tahsilat ya da kötüye kullanıma karşı koruma"],
      retentionTitle: "3. Saklama ve silme", retention: ["Hesap silindiğinde hesabı, profili, üyelikleri, jetonları, analiz tercihini ve içeriklerini gecikmeksizin kaldırırız.","Tek başına kullanılan alanlar tamamen silinir. Paylaşılan alanlar kalan üyelere devredilir; senin içeriklerin silinir.","Paylaşılan bir alanın satın alma hakları diğer üyeleri korumak için kalabilir, ancak silinen hesapla bağlantısı kesilir.","PostHog anonim çalışır; hesap kimliği veya kişisel profil oluşturmaz. Çıkış yapıldığında veya hesap silindiğinde anonim cihaz tanımlayıcısı sıfırlanır, toplanmış veriler yeniden ilişkilendirilmez.","Sentry raporları yalnızca operasyonel olarak gerekli olduğu süre boyunca saklanır ve sonra silinir. Mevcut raporlar talep üzerine silinebilir.","Yasal olarak gerekli ödeme kayıtları öngörülen süre boyunca ayrı saklanır ve ardından imha edilir."],
      refundTitle: "İadeler ve veri saklama", refunds: ["Ömür boyu paketin iadesi veya iptalinde ücretli özellikler sona erer ve ücretsiz sınırlar yeniden geçerli olur.","Ek koltuk işlemleri ve alan verileri hemen silinmez. Fazla üyelerin erişimi, veriler silinmeden askıya alınabilir.","Kapasite geri geldiğinde askıya alınan üyeler katılma sırasına göre yeniden etkinleştirilir. Hesap silme işlemleri ayrıca ele alınır."],
      processorsTitle: "4. Aktarım ve veri işleyenler", processorsIntro: "Hizmet kişisel veri satmaz ve bunları reklam takibi için kullanmaz. Aşağıdaki sağlayıcılar işletim amacıyla veri işler.",
      processorHeaders: ["Veri işleyen","Görev","Saklama yeri"], processorTasks: [["Veritabanı ve kimlik doğrulama sunucusu","Seul bölgesi, Kore (AWS)"],["İzin verilen anlık bildirimlerin gönderimi","Amerika Birleşik Devletleri"],["Sosyal giriş, uygulama içi satın alma ve makbuz doğrulama","İlgili sağlayıcının politikasına göre"],["Açık rıza ile anonim ürün istatistikleri","ABD ve diğer hizmet bölgeleri"],["Hata ve çökme raporları","ABD ve diğer hizmet bölgeleri"]],
      rightsTitle: "5. Haklarına dair", rights: "Ürün analizi varsayılan olarak kapalıdır. Sen seçim yapmadan önce PostHog başlatılmaz ve istatistik gönderilmez. Seçimin hesabında ve cihazında saklanır; yeniden kurulum veya cihaz değişikliğinden sonra da dikkate alınır. İstediğin zaman kapatabilirsin; sonrasında yeni olay gönderilmez. Profil düzenleme ve hesap silme de ayarlardan yapılabilir. Uygulamaya erişemiyorsan <a href=\"./delete-account.html\">web üzerinden silme talebini</a> kullan.",
      officerTitle: "6. Veri koruma sorumlusu ve iletişim", officer: "Sorumlu: Park Byungjun", contact: "İletişim", support: "DayRipple destek sayfası",
      changesTitle: "7. Değişiklikler", changes: "Değişiklikleri uygulama üzerinden veya bu sayfada duyururuz.",
    },
    pl: privacyRecord([
      "Polityka prywatności DayRipple", "Data wejścia w życie: 15 lipca 2026 r.", "DayRipple („Usługa”) starannie przetwarza Twoje dane osobowe i przestrzega obowiązujących przepisów, w tym koreańskiej ustawy o ochronie danych osobowych.", "Usuwanie konta i danych", "Konto możesz natychmiast usunąć w <b>Ustawienia → Konto → Usuń konto</b>. Jeśli nie możesz użyć aplikacji, skorzystaj ze <a href=\"./delete-account.html\">strony żądania usunięcia konta</a>.",
      "1. Gromadzone dane osobowe", ["Kategoria","Dane","Moment zebrania"], [["Dane konta","Adres e-mail, zaszyfrowane dane uwierzytelniające, pseudonim, identyfikator użytkownika","Podczas rejestracji lub logowania społecznościowego"],["Ustawienie opcjonalne","Zgoda lub odmowa na analitykę ulepszania produktu","Gdy dokonujesz wyboru"],["Korzystanie z Usługi","Wydarzenia, rocznice／D-day, zadania, nazwy przestrzeni i skład członków","Gdy samodzielnie je wprowadzasz"],["Urządzenie i powiadomienia","Token push, system operacyjny, język, strefa czasowa, zgody według rodzaju, czas ostatniego użycia","Przy włączeniu powiadomień lub używaniu aplikacji"],["Płatności","Identyfikatory transakcji i produktu, status zakupu／zwrotu, losowy identyfikator do powiązania zakupu","Przy zakupie w aplikacji"],["Anonimowe statystyki","Nazwy i znormalizowane kategorie ukończonych kluczowych działań, wersja aplikacji, system operacyjny, anonimowy identyfikator instalacji","Po wyraźnym zezwoleniu na analitykę"],["Błędy","Wersja aplikacji, system operacyjny, typ błędu／miejsce w kodzie, wewnętrzny identyfikator użytkownika","Gdy wystąpi błąd lub awaria"]],
      "Płatności obsługuje Apple App Store lub Google Play. Usługa nie gromadzi ani nie przechowuje numerów kart, rachunków bankowych ani innych danych środka płatniczego.", "Statystyki PostHog i raporty Sentry nie zawierają e-maila, pseudonimu, nazw przestrzeni, rodzaju relacji, kodów／linków zaproszeń, tytułów ani notatek wydarzeń, rocznic i zadań, ani identyfikatorów czy tokenów płatniczych. Nie gromadzimy identyfikatorów reklamowych, lokalizacji, kontaktów, zdjęć ani aktywności w aplikacjach i witrynach innych firm; nie stosujemy nagrywania ekranu ani odtwarzania sesji.",
      "2. Cele przetwarzania", ["Identyfikacja użytkownika i logowanie","Udostępnianie wydarzeń, rocznic i zadań zaproszonym członkom przestrzeni","Wysyłanie przypomnień i powiadomień push o aktywności członków","Za osobną zgodą — powiadomienia zachęcające do powrotu dopasowane do języka, strefy czasowej i stanu przestrzeni","Weryfikacja dożywotnich uprawnień przestrzeni／dodatkowych miejsc i dostosowanie dostępu po zwrocie lub anulowaniu","Ulepszanie funkcji przez anonimową analizę przepływu użycia wyłącznie za wyraźną zgodą","Obsługa błędów i awarii oraz zapobieganie podwójnym obciążeniom i nadużyciom"],
      "3. Przechowywanie i usuwanie", ["Po usunięciu konta niezwłocznie usuwamy konto, profil, członkostwa, tokeny urządzenia, wybór analityki oraz utworzone wydarzenia, rocznice i zadania.","Przestrzenie używane wyłącznie przez Ciebie są usuwane w całości. Przestrzenie współdzielone przechodzą na pozostałych członków, ale utworzone przez Ciebie treści są usuwane.","Uprawnienie zakupowe wspólnej przestrzeni może pozostać dla ochrony innych członków, lecz bez powiązania z usuniętym kontem.","PostHog działa anonimowo, bez tworzenia identyfikatora konta ani profilu osobowego. Przy wylogowaniu lub usunięciu konta anonimowy identyfikator urządzenia jest resetowany, a dane zagregowane nie są ponownie przypisywane.","Raporty Sentry przechowujemy tylko przez okres konieczny operacyjnie, po czym je usuwamy. Możesz zażądać usunięcia istniejących raportów.","Wymagane prawem zapisy płatności przechowujemy oddzielnie przez ustawowy okres, a następnie niszczymy."],
      "Zwroty płatności i przechowywanie danych", ["Po zwrocie lub anulowaniu dożywotniego dostępu funkcje płatne przestają działać i ponownie obowiązują limity bezpłatne.","Zapisy transakcji dodatkowych miejsc i dane przestrzeni nie są usuwane natychmiast. Dostęp członków ponad limit może zostać zawieszony bez usuwania danych.","Po przywróceniu pojemności ważnym uprawnieniem zawieszeni członkowie wracają według kolejności dołączenia. Usuwanie konta jest obsługiwane oddzielnie."],
      "4. Udostępnianie osobom trzecim i powierzenie przetwarzania", "Usługa nie sprzedaje danych osobowych ani nie używa ich do śledzenia reklamowego. Poniższe podmioty przetwarzają dane jako podmioty przetwarzające w celu świadczenia Usługi.", ["Podmiot przetwarzający","Zadanie","Miejsce przechowywania"], [["Obsługa bazy danych i serwera uwierzytelniania","Region Seul, Korea (AWS)"],["Wysyłanie dozwolonych powiadomień push","Stany Zjednoczone"],["Logowanie społecznościowe, zakupy w aplikacji i weryfikacja paragonów","Zgodnie z polityką każdej firmy"],["Anonimowe statystyki produktu za wyraźną zgodą","Stany Zjednoczone i inne regiony usługi"],["Obsługa raportów błędów i awarii","Stany Zjednoczone i inne regiony usługi"]],
      "5. Twoje prawa", "Analityka ulepszania produktu jest domyślnie wyłączona. Nie inicjalizujemy PostHog ani nie wysyłamy statystyk przed Twoim wyborem. Wybór jest zapisany na koncie i urządzeniu oraz respektowany po ponownej instalacji lub zmianie urządzenia. Możesz wyłączyć analitykę w dowolnym momencie; potem nie wyślemy nowych zdarzeń PostHog. Profil i konto można edytować lub usunąć w ustawieniach. Bez dostępu do aplikacji użyj <a href=\"./delete-account.html\">internetowego żądania usunięcia</a>.", "6. Administrator danych i kontakt", "Administrator: Park Byungjun", "Kontakt", "Strona pomocy DayRipple", "7. Zmiany polityki", "O zmianach poinformujemy w aplikacji lub na tej stronie."
    ]),
    ro: privacyRecord([
      "Politica de confidențialitate DayRipple", "Data intrării în vigoare: 15 iulie 2026", "DayRipple („Serviciul”) îți tratează datele cu grijă și respectă legislația aplicabilă, inclusiv Legea privind protecția informațiilor personale din Coreea.", "Ștergerea contului și a datelor", "Poți șterge imediat contul din <b>Setări → Cont → Șterge contul</b>. Dacă nu poți utiliza aplicația, folosește <a href=\"./delete-account.html\">pagina de solicitare a ștergerii contului</a>.",
      "1. Datele cu caracter personal colectate", ["Categorie","Date","Momentul colectării"], [["Cont","E-mail, credențiale de autentificare criptate, pseudonim, ID utilizator","La înregistrare sau autentificare socială"],["Setare opțională","Acceptarea sau refuzul analizei pentru îmbunătățirea produsului","Când alegi"],["Utilizarea Serviciului","Evenimente, aniversări／zile D, sarcini, denumirile spațiilor și componența membrilor","Când le introduci"],["Dispozitiv și notificări","Token push, sistem de operare, limbă, fus orar, acorduri pe tipuri, ultima utilizare","La activarea notificărilor sau utilizarea aplicației"],["Plată","ID tranzacție și produs, starea achiziției／rambursării, identificator aleatoriu pentru asociere","La achiziția în aplicație"],["Statistici anonime","Numele și categoriile normalizate ale acțiunilor principale finalizate, versiunea, sistemul, identificatorul anonim al instalării","După acordul explicit"],["Erori","Versiunea, sistemul, tipul erorii／locul din cod, ID intern","La eroare sau blocare"]],
      "Plățile sunt procesate de Apple App Store sau Google Play. Serviciul nu colectează și nu stochează numere de card, conturi bancare sau alte date ale metodei de plată.", "Statisticile PostHog și rapoartele Sentry nu includ e-mailul, pseudonimul, denumirile spațiilor, tipul relației, codurile／linkurile de invitație, titlurile ori notele evenimentelor, aniversărilor și sarcinilor sau ID-uri ori tokenuri de plată. Nu colectăm identificatori publicitari, locația, contacte, fotografii sau activitatea din aplicațiile și site-urile altor companii și nu folosim înregistrarea ecranului ori reluarea sesiunii.",
      "2. Scopurile utilizării", ["Identificare și autentificare","Partajarea evenimentelor, aniversărilor și sarcinilor între membrii invitați","Trimiterea mementourilor și a notificărilor push privind activitatea","Cu permisiune separată, notificări de reangajare adaptate limbii, fusului orar și stării spațiului","Verificarea accesului pe viață／locurilor suplimentare și ajustarea accesului după rambursare sau anulare","Îmbunătățirea funcțiilor prin analiză anonimă numai cu acord explicit","Gestionarea erorilor și prevenirea plăților duplicate sau fraudelor"],
      "3. Păstrarea și ștergerea", ["La ștergerea contului eliminăm prompt contul, profilul, calitatea de membru, tokenurile dispozitivului, alegerea privind analiza și conținutul creat.","Spațiile folosite numai de tine se șterg integral. Spațiile partajate sunt transferate membrilor rămași, dar conținutul creat de tine se șterge.","Dreptul de achiziție al unui spațiu partajat poate rămâne pentru protejarea celorlalți membri, fără legătură cu contul șters.","PostHog este utilizat anonim, fără ID de cont sau profil personal. La deconectare sau ștergere, identificatorul anonim al dispozitivului este resetat, iar statisticile agregate nu sunt reasociate.","Rapoartele Sentry se păstrează numai cât este necesar operațional, apoi se șterg. Poți solicita ștergerea rapoartelor existente.","Evidențele de plată impuse de lege se păstrează separat pe durata legală, apoi se distrug."],
      "Rambursări și păstrarea datelor", ["La rambursarea sau anularea accesului pe viață, funcțiile plătite se opresc și se reaplică limitele gratuite.","Evidențele locurilor suplimentare și datele spațiului nu sunt șterse imediat. Accesul membrilor peste capacitate poate fi suspendat fără ștergerea datelor.","Când capacitatea este restabilită printr-un drept valabil, membrii suspendați revin în ordinea înscrierii. Ștergerea contului este tratată separat."],
      "4. Divulgarea către terți și prelucrarea externalizată", "Serviciul nu vinde date personale și nu le utilizează pentru urmărire publicitară. Companiile de mai jos prelucrează date ca persoane împuternicite pentru operarea Serviciului.", ["Persoană împuternicită","Sarcină","Loc de stocare"], [["Bază de date și server de autentificare","Regiunea Seul, Coreea (AWS)"],["Trimiterea notificărilor push permise","Statele Unite"],["Autentificare socială, achiziții în aplicație și verificarea chitanțelor","Conform politicii fiecărei companii"],["Statistici anonime cu acord explicit","Statele Unite și alte regiuni ale serviciului"],["Rapoarte de erori și blocări","Statele Unite și alte regiuni ale serviciului"]],
      "5. Drepturile tale", "Analiza pentru îmbunătățire este dezactivată implicit. Nu inițializăm PostHog și nu trimitem statistici înainte de alegerea ta. Alegerea este salvată în cont și pe dispozitiv și este respectată după reinstalare sau schimbarea dispozitivului. O poți dezactiva oricând; apoi nu mai trimitem evenimente PostHog noi. Poți edita profilul și șterge contul din setări; fără acces la aplicație, folosește <a href=\"./delete-account.html\">solicitarea web de ștergere</a>.", "6. Operatorul datelor și contact", "Operator: Park Byungjun", "Contact", "Pagina de asistență DayRipple", "7. Modificări", "Modificările vor fi anunțate în aplicație sau pe această pagină."
    ]),
    cs: privacyRecord([
      "Zásady ochrany osobních údajů DayRipple", "Účinnost od: 15. července 2026", "DayRipple („Služba“) zachází s vašimi osobními údaji pečlivě a dodržuje platné právní předpisy včetně korejského zákona o ochraně osobních údajů.", "Smazání účtu a dat", "Účet můžete okamžitě smazat v části <b>Nastavení → Účet → Smazat účet</b>. Pokud aplikaci nemůžete použít, využijte <a href=\"./delete-account.html\">stránku žádosti o smazání účtu</a>.",
      "1. Osobní údaje, které shromažďujeme", ["Kategorie","Údaje","Kdy jsou shromažďovány"], [["Účet","E-mail, šifrované ověřovací údaje, přezdívka, ID uživatele","Při registraci nebo sociálním přihlášení"],["Volitelné nastavení","Souhlas či nesouhlas s analýzou pro zlepšování produktu","Při vaší volbě"],["Používání Služby","Události, výročí／D-day, úkoly, názvy prostorů a členové","Když je sami zadáte"],["Zařízení a oznámení","Push token, operační systém, jazyk, časové pásmo, souhlasy dle typu, poslední použití","Při zapnutí oznámení nebo použití aplikace"],["Platba","ID transakce a produktu, stav nákupu／vrácení, náhodný identifikátor pro propojení","Při nákupu v aplikaci"],["Anonymní statistiky","Názvy a normalizované kategorie dokončených hlavních akcí, verze, systém, anonymní identifikátor instalace","Po výslovném souhlasu"],["Chyby","Verze, systém, typ chyby／místo v kódu, interní ID","Při chybě nebo pádu"]],
      "Platby zpracovává Apple App Store nebo Google Play. Služba neshromažďuje ani neukládá čísla karet, bankovních účtů ani jiné údaje platební metody.", "Statistiky PostHog a hlášení Sentry neobsahují e-mail, přezdívku, názvy prostorů, typ vztahu, pozvánkové kódy／odkazy, názvy ani poznámky událostí, výročí a úkolů ani platební ID či tokeny. Neshromažďujeme reklamní identifikátory, polohu, kontakty, fotografie ani aktivitu v aplikacích či webech jiných společností a nepoužíváme záznam obrazovky ani přehrávání relací.",
      "2. Účely použití", ["Identifikace a přihlášení","Sdílení událostí, výročí a úkolů mezi pozvanými členy","Posílání připomenutí a oznámení o aktivitě členů","Se samostatným svolením návratová oznámení podle jazyka, časového pásma a stavu prostoru","Ověření doživotního přístupu／dalších míst a úprava přístupu po vrácení či zrušení","Zlepšování funkcí anonymní analýzou pouze s výslovným souhlasem","Řešení chyb a prevence dvojích plateb či podvodu"],
      "3. Uchovávání a mazání", ["Při smazání účtu bezodkladně smažeme účet, profil, členství, tokeny zařízení, analytickou volbu a vytvořený obsah.","Samostatně používané prostory se smažou celé. Sdílené prostory se převedou na zbývající členy, váš obsah se však smaže.","Nákupní oprávnění sdíleného prostoru může zůstat na ochranu ostatních členů, ale bez vazby na smazaný účet.","PostHog používáme anonymně bez ID účtu či osobních profilů. Při odhlášení nebo smazání se anonymní identifikátor zařízení resetuje a souhrnná data se znovu nepřiřazují.","Hlášení Sentry uchováváme jen po provozně nutnou dobu a poté je mažeme. O smazání stávajících hlášení lze požádat.","Zákonem vyžadované platební záznamy uchováváme odděleně po stanovenou dobu a poté je zničíme."],
      "Vrácení plateb a uchovávání dat", ["Při vrácení nebo zrušení doživotního přístupu skončí placené funkce a znovu platí bezplatné limity.","Záznamy dalších míst a data prostoru se nemažou okamžitě. Přístup členů nad kapacitu lze pozastavit bez smazání dat.","Po obnovení kapacity platným oprávněním se členové obnoví v pořadí připojení. Smazání účtu se řeší samostatně."],
      "4. Sdílení s třetími stranami a pověřené zpracování", "Služba osobní údaje neprodává ani je nepoužívá ke sledování reklamy. Následující společnosti je jako zpracovatelé zpracovávají pro provoz Služby.", ["Zpracovatel","Úloha","Místo uložení"], [["Databáze a ověřovací server","Region Soul, Korea (AWS)"],["Odesílání povolených push oznámení","Spojené státy"],["Sociální přihlášení, nákupy a ověřování účtenek","Podle zásad jednotlivých společností"],["Anonymní statistiky s výslovným souhlasem","Spojené státy a další regiony služby"],["Hlášení chyb a pádů","Spojené státy a další regiony služby"]],
      "5. Vaše práva", "Analýza zlepšování produktu je ve výchozím stavu vypnutá. Před vaší volbou neinicializujeme PostHog ani neodesíláme statistiky. Volba se ukládá k účtu i zařízení a platí po přeinstalaci či změně zařízení. Analýzu můžete kdykoli vypnout; poté se nové události PostHog neposílají. Profil a účet lze upravit či smazat v nastavení; bez přístupu k aplikaci použijte <a href=\"./delete-account.html\">webovou žádost o smazání</a>.", "6. Správce osobních údajů a kontakt", "Správce: Park Byungjun", "Kontakt", "Stránka podpory DayRipple", "7. Změny zásad", "O změnách vás informujeme v aplikaci nebo na této stránce."
    ]),
    ms: privacyRecord([
      "Dasar Privasi DayRipple", "Tarikh kuat kuasa: 15 Julai 2026", "DayRipple (“Perkhidmatan”) mengendalikan maklumat peribadi anda dengan cermat dan mematuhi undang-undang yang terpakai, termasuk Akta Perlindungan Maklumat Peribadi Korea.", "Pemadaman akaun dan data", "Anda boleh memadam akaun serta-merta di <b>Tetapan → Akaun → Padam akaun</b>. Jika anda tidak dapat menggunakan aplikasi, gunakan <a href=\"./delete-account.html\">halaman permintaan pemadaman akaun</a>.",
      "1. Maklumat peribadi yang kami kumpulkan", ["Kategori","Data","Masa dikumpulkan"], [["Akaun","E-mel, kelayakan pengesahan disulitkan, nama panggilan, ID pengguna","Semasa pendaftaran atau log masuk sosial"],["Tetapan pilihan","Persetujuan atau penolakan analitik penambahbaikan produk","Apabila anda memilih"],["Penggunaan Perkhidmatan","Acara, ulang tahun／D-day, tugasan, nama ruang dan ahli","Apabila anda memasukkannya"],["Peranti dan pemberitahuan","Token push, sistem operasi, bahasa, zon waktu, persetujuan mengikut jenis, masa penggunaan terakhir","Apabila mengaktifkan pemberitahuan atau menggunakan aplikasi"],["Pembayaran","ID transaksi dan produk, status pembelian／bayaran balik, pengecam rawak untuk pemautan","Semasa pembelian dalam aplikasi"],["Statistik tanpa nama","Nama dan kategori ternormal tindakan utama yang selesai, versi, sistem, pengecam pemasangan tanpa nama","Selepas kebenaran nyata"],["Ralat","Versi, sistem, jenis ralat／lokasi kod, ID dalaman","Apabila berlaku ralat atau ranap"]],
      "Pembayaran diproses oleh Apple App Store atau Google Play. Perkhidmatan tidak mengumpul atau menyimpan nombor kad, akaun bank atau maklumat kaedah pembayaran lain.", "Statistik PostHog dan laporan Sentry tidak mengandungi e-mel, nama panggilan, nama ruang, jenis hubungan, kod／pautan jemputan, tajuk atau nota acara, ulang tahun dan tugasan, atau ID maupun token pembayaran. Kami tidak mengumpul pengecam iklan, lokasi, kenalan, foto atau aktiviti dalam aplikasi dan laman syarikat lain; kami juga tidak menggunakan rakaman skrin atau main semula sesi.",
      "2. Tujuan penggunaan", ["Pengenalpastian pengguna dan log masuk","Berkongsi acara, ulang tahun dan tugasan antara ahli jemputan","Menghantar peringatan dan pemberitahuan aktiviti ahli","Dengan kebenaran berasingan, pemberitahuan penglibatan semula mengikut bahasa, zon waktu dan status ruang","Mengesahkan akses seumur hidup／tempat tambahan dan melaraskan akses selepas bayaran balik atau pembatalan","Menambah baik ciri melalui analitik tanpa nama hanya dengan kebenaran nyata","Menangani ralat dan mencegah caj berganda atau penipuan"],
      "3. Penyimpanan dan pemadaman", ["Apabila akaun dipadam, kami segera memadam akaun, profil, keahlian, token peranti, pilihan analitik dan kandungan yang anda cipta.","Ruang yang anda gunakan bersendirian dipadam sepenuhnya. Ruang kongsi dipindahkan kepada ahli yang tinggal, tetapi kandungan anda dipadam.","Kelayakan pembelian ruang kongsi boleh kekal untuk melindungi ahli lain, tanpa pautan kepada akaun yang dipadam.","PostHog digunakan secara tanpa nama tanpa ID akaun atau profil peribadi. Semasa log keluar atau pemadaman, pengecam tanpa nama peranti ditetapkan semula dan statistik agregat tidak dipautkan semula.","Laporan Sentry disimpan hanya sepanjang diperlukan untuk operasi lalu dipadam. Anda boleh meminta pemadaman laporan sedia ada.","Rekod pembayaran yang diwajibkan undang-undang disimpan berasingan sepanjang tempoh berkanun lalu dimusnahkan."],
      "Bayaran balik dan penyimpanan data", ["Jika akses seumur hidup dibayar balik atau dibatalkan, ciri berbayar berhenti dan had percuma digunakan semula.","Rekod tempat tambahan dan data ruang tidak dipadam serta-merta. Akses ahli melebihi kapasiti boleh digantung tanpa memadam data.","Apabila kapasiti dipulihkan dengan kelayakan sah, ahli digantung dipulihkan mengikut urutan menyertai. Pemadaman akaun diuruskan secara berasingan."],
      "4. Perkongsian dengan pihak ketiga dan pemprosesan luar", "Perkhidmatan tidak menjual maklumat peribadi atau menggunakannya untuk penjejakan iklan. Syarikat berikut memproses data sebagai pemproses bagi mengendalikan Perkhidmatan.", ["Pemproses","Tugas","Lokasi simpanan"], [["Pangkalan data dan pelayan pengesahan","Rantau Seoul, Korea (AWS)"],["Menghantar pemberitahuan push yang dibenarkan","Amerika Syarikat"],["Log masuk sosial, pembelian dan pengesahan resit","Menurut dasar setiap syarikat"],["Statistik tanpa nama dengan kebenaran nyata","Amerika Syarikat dan rantau perkhidmatan lain"],["Laporan ralat dan ranap","Amerika Syarikat dan rantau perkhidmatan lain"]],
      "5. Hak anda", "Analitik penambahbaikan produk dimatikan secara lalai. Kami tidak memulakan PostHog atau menghantar statistik sebelum pilihan anda. Pilihan disimpan pada akaun dan peranti serta dihormati selepas pemasangan semula atau pertukaran peranti. Anda boleh mematikannya pada bila-bila masa; selepas itu tiada acara PostHog baharu dihantar. Profil dan akaun juga boleh disunting atau dipadam dalam tetapan; tanpa akses aplikasi, gunakan <a href=\"./delete-account.html\">permintaan pemadaman web</a>.", "6. Pengawal data dan hubungan", "Pengawal: Park Byungjun", "Hubungi", "Halaman sokongan DayRipple", "7. Perubahan dasar", "Perubahan akan dimaklumkan melalui aplikasi atau halaman ini."
    ]),
    el: privacyRecord([
      "Πολιτική απορρήτου του DayRipple", "Ημερομηνία έναρξης ισχύος: 15 Ιουλίου 2026", "Το DayRipple («Υπηρεσία») χειρίζεται τα προσωπικά σας δεδομένα με προσοχή και συμμορφώνεται με την ισχύουσα νομοθεσία, συμπεριλαμβανομένου του νόμου της Κορέας για την προστασία προσωπικών πληροφοριών.", "Διαγραφή λογαριασμού και δεδομένων", "Μπορείτε να διαγράψετε αμέσως τον λογαριασμό από <b>Ρυθμίσεις → Λογαριασμός → Διαγραφή λογαριασμού</b>. Αν δεν μπορείτε να χρησιμοποιήσετε την εφαρμογή, χρησιμοποιήστε τη <a href=\"./delete-account.html\">σελίδα αιτήματος διαγραφής</a>.",
      "1. Προσωπικά δεδομένα που συλλέγουμε", ["Κατηγορία","Δεδομένα","Χρόνος συλλογής"], [["Λογαριασμός","Email, κρυπτογραφημένα διαπιστευτήρια ελέγχου ταυτότητας, ψευδώνυμο, αναγνωριστικό χρήστη","Κατά την εγγραφή ή κοινωνική σύνδεση"],["Προαιρετική ρύθμιση","Συγκατάθεση ή άρνηση αναλυτικών στοιχείων βελτίωσης προϊόντος","Όταν επιλέγετε"],["Χρήση Υπηρεσίας","Εκδηλώσεις, επέτειοι／D-day, εργασίες, ονόματα χώρων και σύνθεση μελών","Όταν τα εισάγετε"],["Συσκευή και ειδοποιήσεις","Διακριτικό push, λειτουργικό σύστημα, γλώσσα, ζώνη ώρας, άδειες ανά τύπο, τελευταία χρήση","Κατά την ενεργοποίηση ειδοποιήσεων ή χρήση της εφαρμογής"],["Πληρωμή","Αναγνωριστικά συναλλαγής και προϊόντος, κατάσταση αγοράς／επιστροφής, τυχαίο αναγνωριστικό σύνδεσης","Κατά την αγορά εντός εφαρμογής"],["Ανώνυμα στατιστικά","Ονόματα και κανονικοποιημένες κατηγορίες ολοκληρωμένων κύριων ενεργειών, έκδοση, σύστημα, ανώνυμο αναγνωριστικό εγκατάστασης","Μετά από ρητή άδεια"],["Σφάλματα","Έκδοση, σύστημα, τύπος σφάλματος／θέση κώδικα, εσωτερικό αναγνωριστικό","Σε σφάλμα ή διακοπή λειτουργίας"]],
      "Οι πληρωμές διεκπεραιώνονται από το Apple App Store ή το Google Play. Η Υπηρεσία δεν συλλέγει ούτε αποθηκεύει αριθμούς καρτών, τραπεζικών λογαριασμών ή άλλα στοιχεία μεθόδου πληρωμής.", "Τα στατιστικά PostHog και οι αναφορές Sentry δεν περιλαμβάνουν email, ψευδώνυμο, ονόματα χώρων, τύπο σχέσης, κωδικούς／συνδέσμους πρόσκλησης, τίτλους ή σημειώσεις εκδηλώσεων, επετείων και εργασιών ή αναγνωριστικά και διακριτικά πληρωμών. Δεν συλλέγουμε αναγνωριστικά διαφήμισης, τοποθεσία, επαφές, φωτογραφίες ή δραστηριότητα σε εφαρμογές και ιστοτόπους άλλων εταιρειών και δεν χρησιμοποιούμε καταγραφή οθόνης ή αναπαραγωγή συνεδρίας.",
      "2. Σκοποί χρήσης", ["Ταυτοποίηση και σύνδεση","Κοινή χρήση εκδηλώσεων, επετείων και εργασιών μεταξύ προσκεκλημένων μελών","Αποστολή υπενθυμίσεων και ειδοποιήσεων δραστηριότητας","Με χωριστή άδεια, ειδοποιήσεις επαναδραστηριοποίησης σύμφωνα με γλώσσα, ζώνη ώρας και κατάσταση χώρου","Επαλήθευση ισόβιας πρόσβασης／πρόσθετων θέσεων και προσαρμογή πρόσβασης μετά από επιστροφή ή ακύρωση","Βελτίωση λειτουργιών μέσω ανώνυμης ανάλυσης μόνο με ρητή άδεια","Αντιμετώπιση σφαλμάτων και αποτροπή διπλών χρεώσεων ή απάτης"],
      "3. Διατήρηση και διαγραφή", ["Κατά τη διαγραφή λογαριασμού διαγράφουμε άμεσα λογαριασμό, προφίλ, συμμετοχές, διακριτικά συσκευής, επιλογή αναλυτικών στοιχείων και περιεχόμενο που δημιουργήσατε.","Οι χώροι που χρησιμοποιούσατε μόνοι διαγράφονται πλήρως. Οι κοινόχρηστοι χώροι μεταβιβάζονται στα μέλη που παραμένουν, αλλά το περιεχόμενό σας διαγράφεται.","Το δικαίωμα αγοράς κοινόχρηστου χώρου μπορεί να παραμείνει για την προστασία άλλων μελών, χωρίς σύνδεση με τον διαγραμμένο λογαριασμό.","Το PostHog χρησιμοποιείται ανώνυμα χωρίς αναγνωριστικό λογαριασμού ή προσωπικό προφίλ. Κατά την αποσύνδεση ή διαγραφή, το ανώνυμο αναγνωριστικό συσκευής επαναφέρεται και τα συγκεντρωτικά στατιστικά δεν επανασυνδέονται.","Οι αναφορές Sentry διατηρούνται μόνο για όσο είναι λειτουργικά αναγκαίο και μετά διαγράφονται. Μπορείτε να ζητήσετε διαγραφή υπαρχουσών αναφορών.","Τα αρχεία πληρωμών που απαιτούνται από τον νόμο διατηρούνται χωριστά για τη νόμιμη περίοδο και μετά καταστρέφονται."],
      "Επιστροφές χρημάτων και διατήρηση δεδομένων", ["Με επιστροφή ή ακύρωση ισόβιας πρόσβασης, οι επί πληρωμή λειτουργίες διακόπτονται και ισχύουν ξανά τα δωρεάν όρια.","Τα αρχεία πρόσθετων θέσεων και τα δεδομένα χώρου δεν διαγράφονται αμέσως. Η πρόσβαση μελών πέραν της χωρητικότητας μπορεί να ανασταλεί χωρίς διαγραφή δεδομένων.","Όταν αποκατασταθεί η χωρητικότητα με έγκυρο δικαίωμα, τα μέλη επανέρχονται κατά σειρά συμμετοχής. Η διαγραφή λογαριασμού αντιμετωπίζεται χωριστά."],
      "4. Κοινοποίηση σε τρίτους και ανάθεση επεξεργασίας", "Η Υπηρεσία δεν πωλεί προσωπικά δεδομένα ούτε τα χρησιμοποιεί για διαφημιστική παρακολούθηση. Οι ακόλουθες εταιρείες επεξεργάζονται δεδομένα ως εκτελούντες την επεξεργασία για τη λειτουργία της Υπηρεσίας.", ["Εκτελών την επεξεργασία","Εργασία","Τόπος αποθήκευσης"], [["Βάση δεδομένων και διακομιστής ελέγχου ταυτότητας","Περιοχή Σεούλ, Κορέα (AWS)"],["Αποστολή επιτρεπόμενων ειδοποιήσεων push","Ηνωμένες Πολιτείες"],["Κοινωνική σύνδεση, αγορές και επαλήθευση αποδείξεων","Σύμφωνα με την πολιτική κάθε εταιρείας"],["Ανώνυμα στατιστικά με ρητή άδεια","Ηνωμένες Πολιτείες και άλλες περιοχές υπηρεσίας"],["Αναφορές σφαλμάτων και διακοπών","Ηνωμένες Πολιτείες και άλλες περιοχές υπηρεσίας"]],
      "5. Τα δικαιώματά σας", "Τα αναλυτικά στοιχεία βελτίωσης είναι απενεργοποιημένα από προεπιλογή. Δεν αρχικοποιούμε το PostHog ούτε στέλνουμε στατιστικά πριν από την επιλογή σας. Η επιλογή αποθηκεύεται στον λογαριασμό και τη συσκευή και τηρείται μετά από επανεγκατάσταση ή αλλαγή συσκευής. Μπορείτε να την απενεργοποιήσετε ανά πάσα στιγμή· έπειτα δεν αποστέλλονται νέα συμβάντα PostHog. Μπορείτε επίσης να επεξεργαστείτε το προφίλ και να διαγράψετε τον λογαριασμό στις ρυθμίσεις· χωρίς πρόσβαση στην εφαρμογή, χρησιμοποιήστε το <a href=\"./delete-account.html\">διαδικτυακό αίτημα διαγραφής</a>.", "6. Υπεύθυνος επεξεργασίας και επικοινωνία", "Υπεύθυνος επεξεργασίας: Park Byungjun", "Επικοινωνία", "Σελίδα υποστήριξης DayRipple", "7. Αλλαγές πολιτικής", "Οι αλλαγές θα γνωστοποιούνται μέσω της εφαρμογής ή σε αυτή τη σελίδα."
    ]),
    hu: privacyRecord([
      "A DayRipple adatvédelmi szabályzata", "Hatálybalépés: 2026. július 15.", "A DayRipple („Szolgáltatás”) gondosan kezeli személyes adataidat, és betartja az alkalmazandó jogszabályokat, köztük Korea személyesadat-védelmi törvényét.", "Fiók és adatok törlése", "A fiókot azonnal törölheted a <b>Beállítások → Fiók → Fiók törlése</b> menüpontban. Ha nem tudod használni az alkalmazást, használd a <a href=\"./delete-account.html\">fióktörlési kérelmi oldalt</a>.",
      "1. Az általunk gyűjtött személyes adatok", ["Kategória","Adatok","Gyűjtés időpontja"], [["Fiók","E-mail-cím, titkosított hitelesítési adatok, becenév, felhasználói azonosító","Regisztrációkor vagy közösségi bejelentkezéskor"],["Opcionális beállítás","A termékfejlesztési elemzés engedélyezése vagy elutasítása","A választáskor"],["Szolgáltatáshasználat","Események, évfordulók／D-dayek, teendők, térnevek és tagösszetétel","Amikor megadod őket"],["Eszköz és értesítések","Push-token, operációs rendszer, nyelv, időzóna, típusonkénti engedélyek, utolsó használat","Értesítések engedélyezésekor vagy az alkalmazás használatakor"],["Fizetés","Tranzakció- és termékazonosító, vásárlási／visszatérítési állapot, véletlenszerű kapcsolóazonosító","Alkalmazáson belüli vásárláskor"],["Névtelen statisztika","Befejezett fő műveletek neve és normalizált kategóriája, verzió, rendszer, névtelen telepítési azonosító","Kifejezett engedély után"],["Hibák","Verzió, rendszer, hibatípus／kódhely, belső felhasználói azonosító","Hiba vagy összeomlás esetén"]],
      "A fizetéseket az Apple App Store vagy a Google Play dolgozza fel. A Szolgáltatás nem gyűjt és nem tárol kártyaszámot, bankszámlaszámot vagy más fizetésimód-adatot.", "A PostHog statisztikák és Sentry-jelentések nem tartalmaznak e-mailt, becenevet, térnevet, kapcsolattípust, meghívókódot／-linket, események, évfordulók és teendők címét vagy jegyzetét, illetve fizetési azonosítót vagy tokent. Nem gyűjtünk hirdetési azonosítót, helyadatot, névjegyeket, fényképeket vagy más cégek alkalmazásaiban és webhelyein végzett tevékenységet, és nem használunk képernyőfelvételt vagy munkamenet-visszajátszást.",
      "2. Felhasználási célok", ["Azonosítás és bejelentkezés","Események, évfordulók és teendők megosztása meghívott tagok között","Emlékeztetők és tagaktivitási pushértesítések küldése","Külön engedéllyel visszatérési értesítések a nyelv, időzóna és térállapot szerint","Élethosszig tartó hozzáférés／további helyek ellenőrzése és hozzáférés módosítása visszatérítés vagy lemondás után","Funkciófejlesztés névtelen elemzéssel kizárólag kifejezett engedéllyel","Hibakezelés és kettős terhelések vagy csalás megelőzése"],
      "3. Megőrzés és törlés", ["Fióktörléskor haladéktalanul töröljük a fiókot, profilt, tagságokat, eszköztokeneket, elemzési választást és az általad létrehozott tartalmat.","Az egyedül használt tereket teljesen töröljük. A megosztott tereket átadjuk a megmaradó tagoknak, de a tartalmadat töröljük.","A megosztott tér vásárlási jogosultsága más tagok védelmében megmaradhat, de a törölt fiókhoz való kapcsolat nélkül.","A PostHog névtelenül működik, fiókazonosító és személyes profil nélkül. Kijelentkezéskor vagy törléskor az eszköz névtelen azonosítója alaphelyzetbe áll, az összesített adatokat nem kapcsoljuk újra.","A Sentry-jelentéseket csak az üzemeltetéshez szükséges ideig őrizzük, majd töröljük. A meglévő jelentések törlése kérhető.","A törvény által előírt fizetési nyilvántartást elkülönítve őrizzük a törvényes időtartamig, majd megsemmisítjük."],
      "Visszatérítések és adatmegőrzés", ["Élethosszig tartó hozzáférés visszatérítése vagy lemondása után a fizetős funkciók megszűnnek, és ismét az ingyenes korlátok érvényesek.","A további helyek tranzakciós adatait és a téradatokat nem töröljük azonnal. A kapacitáson felüli tagok hozzáférése az adatok törlése nélkül felfüggeszthető.","Érvényes jogosultsággal helyreállított kapacitásnál a tagok csatlakozási sorrendben térnek vissza. A fióktörlést külön kezeljük."],
      "4. Harmadik felek és adatfeldolgozás", "A Szolgáltatás nem értékesít személyes adatokat, és nem használja őket hirdetési követésre. Az alábbi vállalatok adatfeldolgozóként kezelnek adatokat a Szolgáltatás működtetéséhez.", ["Adatfeldolgozó","Feladat","Tárolási hely"], [["Adatbázis és hitelesítési kiszolgáló","Szöul régió, Korea (AWS)"],["Engedélyezett pushértesítések küldése","Egyesült Államok"],["Közösségi bejelentkezés, vásárlások és bizonylat-ellenőrzés","Az egyes vállalatok szabályzata szerint"],["Névtelen statisztika kifejezett engedéllyel","Egyesült Államok és más szolgáltatási régiók"],["Hiba- és összeomlási jelentések","Egyesült Államok és más szolgáltatási régiók"]],
      "5. A jogaid", "A termékfejlesztési elemzés alapértelmezés szerint ki van kapcsolva. A választásod előtt nem indítjuk el a PostHogot és nem küldünk statisztikát. A választást a fiók és az eszköz tárolja, és újratelepítés vagy eszközcsere után is érvényes. Bármikor kikapcsolhatod; ezután nem küldünk új PostHog-eseményt. A profil szerkeszthető, a fiók törölhető a beállításokban; alkalmazás-hozzáférés nélkül használd a <a href=\"./delete-account.html\">webes törlési kérelmet</a>.", "6. Adatkezelő és kapcsolat", "Adatkezelő: Park Byungjun", "Kapcsolat", "DayRipple támogatási oldal", "7. Módosítások", "A módosításokról az alkalmazásban vagy ezen az oldalon értesítünk."
    ]),
    "pt-PT": privacyRecord([
      "Política de Privacidade do DayRipple", "Data de entrada em vigor: 15 de julho de 2026", "O DayRipple (o «Serviço») trata os seus dados pessoais com cuidado e cumpre a legislação aplicável, incluindo a Lei de Proteção de Informações Pessoais da Coreia.", "Eliminação da conta e dos dados", "Pode eliminar imediatamente a conta em <b>Definições → Conta → Eliminar conta</b>. Se não conseguir utilizar a aplicação, use a <a href=\"./delete-account.html\">página de pedido de eliminação</a>.",
      "1. Dados pessoais que recolhemos", ["Categoria","Dados","Momento da recolha"], [["Conta","E-mail, credenciais de autenticação encriptadas, alcunha, ID de utilizador","No registo ou início de sessão social"],["Definição opcional","Consentimento ou recusa da análise de melhoria do produto","Quando escolhe"],["Utilização do Serviço","Eventos, aniversários／dias D, tarefas, nomes dos espaços e composição dos membros","Quando os introduz"],["Dispositivo e notificações","Token push, sistema operativo, idioma, fuso horário, permissões por tipo, última utilização","Ao ativar notificações ou utilizar a aplicação"],["Pagamento","ID de transação e produto, estado da compra／reembolso, identificador aleatório de associação","Numa compra na aplicação"],["Estatísticas anónimas","Nomes e categorias normalizadas das principais ações concluídas, versão, sistema, identificador anónimo de instalação","Após autorização expressa"],["Erros","Versão, sistema, tipo de erro／localização do código, ID interno","Quando ocorre um erro ou falha"]],
      "Os pagamentos são processados pela Apple App Store ou pelo Google Play. O Serviço não recolhe nem armazena números de cartão, contas bancárias ou outros dados do método de pagamento.", "As estatísticas do PostHog e os relatórios do Sentry não incluem e-mail, alcunha, nomes dos espaços, tipo de relação, códigos／ligações de convite, títulos ou notas de eventos, aniversários e tarefas, nem IDs ou tokens de pagamento. Não recolhemos identificadores de publicidade, localização, contactos, fotografias ou atividade em aplicações e sites de outras empresas; também não usamos gravação de ecrã nem reprodução de sessão.",
      "2. Finalidades", ["Identificação e início de sessão","Partilha de eventos, aniversários e tarefas entre membros convidados","Envio de lembretes e notificações de atividade","Com autorização separada, notificações de reenvolvimento adaptadas ao idioma, fuso horário e estado do espaço","Verificação de acesso vitalício／lugares adicionais e ajuste do acesso após reembolso ou cancelamento","Melhoria de funcionalidades através de análise anónima, apenas com autorização expressa","Tratamento de erros e prevenção de cobranças duplicadas ou fraude"],
      "3. Conservação e eliminação", ["Ao eliminar a conta, removemos prontamente a conta, o perfil, as participações, os tokens do dispositivo, a escolha de análise e o conteúdo que criou.","Os espaços usados apenas por si são totalmente eliminados. Os espaços partilhados são transferidos para os membros restantes, mas o conteúdo que criou é eliminado.","O direito de compra de um espaço partilhado pode manter-se para proteger os outros membros, sem associação à conta eliminada.","O PostHog é usado de forma anónima, sem criar IDs de conta ou perfis pessoais. Ao terminar sessão ou eliminar a conta, o identificador anónimo do dispositivo é reposto e as estatísticas agregadas não são novamente associadas.","Os relatórios do Sentry são conservados apenas durante o período operacionalmente necessário e depois eliminados. Pode pedir a eliminação de relatórios existentes.","Os registos de pagamento exigidos por lei são guardados separadamente durante o prazo legal e depois destruídos."],
      "Reembolsos e conservação de dados", ["Se um acesso vitalício for reembolsado ou cancelado, as funcionalidades pagas cessam e os limites gratuitos voltam a aplicar-se.","Os registos de lugares adicionais e os dados do espaço não são eliminados imediatamente. O acesso de membros acima da capacidade pode ser suspenso sem apagar os dados.","Quando a capacidade é restabelecida por um direito válido, os membros suspensos regressam pela ordem de adesão. A eliminação da conta é tratada separadamente."],
      "4. Partilha com terceiros e subcontratação do tratamento", "O Serviço não vende dados pessoais nem os utiliza para rastreio publicitário. As empresas seguintes tratam dados, na qualidade de subcontratantes, para operar o Serviço.", ["Subcontratante","Tarefa","Local de armazenamento"], [["Base de dados e servidor de autenticação","Região de Seul, Coreia (AWS)"],["Envio de notificações push autorizadas","Estados Unidos"],["Início de sessão social, compras e verificação de recibos","Segundo a política de cada empresa"],["Estatísticas anónimas com autorização expressa","Estados Unidos e outras regiões do serviço"],["Relatórios de erros e falhas","Estados Unidos e outras regiões do serviço"]],
      "5. Os seus direitos", "A análise de melhoria do produto está desativada por predefinição. Não inicializamos o PostHog nem enviamos estatísticas antes da sua escolha. A escolha é guardada na conta e no dispositivo e respeitada após reinstalação ou mudança de dispositivo. Pode desativá-la a qualquer momento; depois disso não são enviados novos eventos do PostHog. Também pode editar o perfil e eliminar a conta nas definições; sem acesso à aplicação, use o <a href=\"./delete-account.html\">pedido de eliminação na Web</a>.", "6. Responsável pelo tratamento e contacto", "Responsável pelo tratamento: Park Byungjun", "Contacto", "Página de suporte DayRipple", "7. Alterações", "As alterações serão comunicadas na aplicação ou nesta página."
    ]),
    uk: privacyRecord([
      "Політика конфіденційності DayRipple", "Дата набрання чинності: 15 липня 2026 року", "DayRipple («Сервіс») дбайливо обробляє ваші персональні дані та дотримується чинного законодавства, зокрема Закону Кореї про захист персональної інформації.", "Видалення облікового запису та даних", "Обліковий запис можна негайно видалити в розділі <b>Налаштування → Обліковий запис → Видалити обліковий запис</b>. Якщо застосунок недоступний, скористайтеся <a href=\"./delete-account.html\">сторінкою запиту на видалення</a>.",
      "1. Персональні дані, які ми збираємо", ["Категорія","Дані","Коли збираються"], [["Обліковий запис","Електронна пошта, зашифровані облікові дані автентифікації, псевдонім, ID користувача","Під час реєстрації або соціального входу"],["Необов’язкове налаштування","Згода або відмова від аналітики вдосконалення продукту","Коли ви робите вибір"],["Використання Сервісу","Події, річниці／D-day, завдання, назви просторів і склад учасників","Коли ви вводите їх"],["Пристрій і сповіщення","Push-токен, операційна система, мова, часовий пояс, дозволи за типами, останнє використання","Під час увімкнення сповіщень або використання застосунку"],["Платіж","ID транзакції та продукту, стан покупки／повернення, випадковий ідентифікатор для зв’язування","Під час покупки в застосунку"],["Анонімна статистика","Назви й нормалізовані категорії завершених основних дій, версія, система, анонімний ідентифікатор встановлення","Після явного дозволу"],["Помилки","Версія, система, тип помилки／місце в коді, внутрішній ID","У разі помилки або збою"]],
      "Платежі обробляє Apple App Store або Google Play. Сервіс не збирає й не зберігає номери карток, банківських рахунків або інші дані способу оплати.", "Статистика PostHog і звіти Sentry не містять електронної пошти, псевдоніма, назв просторів, типу стосунків, кодів／посилань запрошення, назв чи нотаток подій, річниць і завдань, а також платіжних ID або токенів. Ми не збираємо рекламні ідентифікатори, місцезнаходження, контакти, фотографії чи активність у застосунках і на сайтах інших компаній та не використовуємо запис екрана або відтворення сеансів.",
      "2. Цілі використання", ["Ідентифікація та вхід","Спільне використання подій, річниць і завдань запрошеними учасниками","Надсилання нагадувань і сповіщень про активність учасників","За окремим дозволом — сповіщення для повторного залучення з урахуванням мови, часового поясу й стану простору","Перевірка довічного доступу／додаткових місць і коригування доступу після повернення або скасування","Поліпшення функцій за допомогою анонімного аналізу лише з явного дозволу","Обробка помилок і запобігання подвійним списанням або шахрайству"],
      "3. Зберігання та видалення", ["Після видалення облікового запису ми без зволікань видаляємо обліковий запис, профіль, участь, токени пристрою, вибір аналітики та створений вами вміст.","Простори, якими користувалися лише ви, видаляються повністю. Спільні простори передаються учасникам, які залишилися, але створений вами вміст видаляється.","Право покупки спільного простору може залишитися для захисту інших учасників, але без зв’язку з видаленим обліковим записом.","PostHog використовується анонімно, без створення ID облікового запису чи особистого профілю. Під час виходу або видалення анонімний ідентифікатор пристрою скидається, а агреговані дані не прив’язуються повторно.","Звіти Sentry зберігаються лише протягом операційно необхідного строку, а потім видаляються. Можна запросити видалення наявних звітів.","Платіжні записи, які вимагає закон, зберігаються окремо протягом установленого строку, а потім знищуються."],
      "Повернення коштів і зберігання даних", ["Після повернення або скасування довічного доступу платні функції припиняються, а безкоштовні обмеження застосовуються знову.","Записи додаткових місць і дані простору не видаляються негайно. Доступ учасників понад місткість може бути призупинено без видалення даних.","Коли місткість відновлено чинним правом, учасники повертаються в порядку приєднання. Видалення облікового запису обробляється окремо."],
      "4. Передача третім особам і доручена обробка", "Сервіс не продає персональні дані та не використовує їх для рекламного відстеження. Наведені нижче компанії обробляють дані як обробники для роботи Сервісу.", ["Обробник","Завдання","Місце зберігання"], [["База даних і сервер автентифікації","Регіон Сеул, Корея (AWS)"],["Надсилання дозволених push-сповіщень","Сполучені Штати"],["Соціальний вхід, покупки та перевірка квитанцій","Згідно з політикою кожної компанії"],["Анонімна статистика з явного дозволу","Сполучені Штати та інші регіони сервісу"],["Звіти про помилки та збої","Сполучені Штати та інші регіони сервісу"]],
      "5. Ваші права", "Аналітика вдосконалення продукту вимкнена за замовчуванням. Ми не ініціалізуємо PostHog і не надсилаємо статистику до вашого вибору. Вибір зберігається в обліковому записі й на пристрої та діє після перевстановлення або зміни пристрою. Її можна вимкнути будь-коли; після цього нові події PostHog не надсилаються. Профіль можна редагувати, а обліковий запис видалити в налаштуваннях; без доступу до застосунку використовуйте <a href=\"./delete-account.html\">вебзапит на видалення</a>.", "6. Контролер даних і контакти", "Контролер: Park Byungjun", "Контакти", "Сторінка підтримки DayRipple", "7. Зміни політики", "Про зміни буде повідомлено в застосунку або на цій сторінці."
    ]),
    fil: privacyRecord([
      "Patakaran sa Privacy ng DayRipple", "Petsa ng bisa: Hulyo 15, 2026", "Maingat na pinangangasiwaan ng DayRipple (ang “Serbisyo”) ang iyong personal na impormasyon at sumusunod sa mga naaangkop na batas, kabilang ang Personal Information Protection Act ng Korea.", "Pag-delete ng account at data", "Maaari mong i-delete agad ang account sa <b>Mga Setting → Account → I-delete ang account</b>. Kung hindi mo magamit ang app, gamitin ang <a href=\"./delete-account.html\">pahina ng kahilingan sa pag-delete</a>.",
      "1. Personal na impormasyong kinokolekta namin", ["Kategorya","Data","Kailan kinokolekta"], [["Account","Email, naka-encrypt na authentication credentials, palayaw, user ID","Sa pag-sign up o social login"],["Opsyonal na setting","Pahintulot o pagtanggi sa product-improvement analytics","Kapag pumili ka"],["Paggamit ng Serbisyo","Mga event, anibersaryo／D-day, gawain, pangalan ng space at komposisyon ng miyembro","Kapag ikaw ang naglagay"],["Device at notification","Push token, operating system, wika, time zone, pahintulot ayon sa uri, huling paggamit","Kapag nag-enable ng notification o gumamit ng app"],["Pagbabayad","Transaction at product ID, status ng pagbili／refund, random identifier para sa pag-link","Sa in-app purchase"],["Anonymous na statistics","Mga pangalan at normalized na kategorya ng natapos na pangunahing aksyon, bersyon, system, anonymous install identifier","Pagkatapos ng hayagang pahintulot"],["Error","Bersyon, system, uri ng error／lokasyon sa code, internal user ID","Kapag may error o crash"]],
      "Ang Apple App Store o Google Play ang nagpoproseso ng mga bayad. Hindi kinokolekta o iniimbak ng Serbisyo ang mga numero ng card, bank account, o iba pang detalye ng paraan ng pagbabayad.", "Hindi kasama sa PostHog statistics at Sentry reports ang email, palayaw, pangalan ng space, uri ng relasyon, invitation code／link, pamagat o memo ng mga event, anibersaryo at gawain, o payment ID at token. Hindi kami nangongolekta ng advertising identifier, lokasyon, contact, larawan, o aktibidad sa mga app at website ng ibang kumpanya; hindi rin kami gumagamit ng screen recording o session replay.",
      "2. Mga layunin ng paggamit", ["Pagkilala at pag-login","Pagbabahagi ng mga event, anibersaryo at gawain sa mga inimbitahang miyembro","Pagpapadala ng reminder at notification tungkol sa aktibidad","Sa hiwalay na pahintulot, re-engagement notification ayon sa wika, time zone at status ng space","Pag-verify ng lifetime access／dagdag na seat at pag-aayos ng access pagkatapos ng refund o cancellation","Pagpapahusay ng feature sa anonymous analytics kung may hayagang pahintulot lamang","Pagtugon sa error at pag-iwas sa duplicate charge o pandaraya"],
      "3. Pagpapanatili at pag-delete", ["Kapag dinelete ang account, agad naming dini-delete ang account, profile, membership, device token, piniling analytics, at content na ginawa mo.","Ganap na dini-delete ang mga space na ikaw lang ang gumagamit. Inililipat ang shared space sa natitirang miyembro, ngunit dini-delete ang content mo.","Maaaring manatili ang purchase entitlement ng shared space para protektahan ang ibang miyembro, ngunit inaalis ang link nito sa na-delete na account.","Anonymous ang paggamit ng PostHog at hindi ito gumagawa ng account ID o personal profile. Sa pag-log out o pag-delete, nire-reset ang anonymous device identifier at hindi muling iniuugnay ang pinagsama-samang data.","Pinananatili lamang ang Sentry reports habang kailangan sa operasyon at pagkatapos ay dini-delete. Maaari mong hilinging i-delete ang mga kasalukuyang report.","Hiwalay na pinananatili ang payment records na hinihingi ng batas sa itinakdang panahon at pagkatapos ay sinisira."],
      "Mga refund at pagpapanatili ng data", ["Kapag na-refund o nakansela ang lifetime access, hihinto ang paid feature at muling ilalapat ang free limits.","Hindi agad dini-delete ang extra-seat transaction records at space data. Maaaring suspindihin ang access ng miyembrong lampas sa capacity nang hindi dini-delete ang data.","Kapag naibalik ang capacity sa pamamagitan ng valid entitlement, ibinabalik ang mga miyembro ayon sa pagkakasunod ng pagsali. Hiwalay na pinoproseso ang account deletion."],
      "4. Pagbabahagi sa third party at ipinagkatiwalang pagproseso", "Hindi ibinebenta ng Serbisyo ang personal na impormasyon o ginagamit ito sa ad tracking. Pinoproseso ng mga sumusunod na kumpanya ang data bilang mga processor upang patakbuhin ang Serbisyo.", ["Processor","Gawain","Lokasyon ng storage"], [["Database at authentication server","Rehiyon ng Seoul, Korea (AWS)"],["Pagpapadala ng pinahintulutang push notification","United States"],["Social login, mga pagbili at receipt verification","Ayon sa patakaran ng bawat kumpanya"],["Anonymous statistics na may hayagang pahintulot","United States at iba pang service region"],["Error at crash reports","United States at iba pang service region"]],
      "5. Mga karapatan mo", "Naka-off bilang default ang product-improvement analytics. Hindi namin sinisimulan ang PostHog o nagpapadala ng statistics bago ka pumili. Naka-save ang pinili mo sa account at device at sinusunod ito pagkatapos ng reinstall o pagpapalit ng device. Maaari mo itong i-off anumang oras; pagkatapos ay walang bagong PostHog event na ipapadala. Maaari mo ring i-edit ang profile at i-delete ang account sa mga setting; kung walang access sa app, gamitin ang <a href=\"./delete-account.html\">web deletion request</a>.", "6. Data controller at contact", "Controller: Park Byungjun", "Makipag-ugnayan", "Pahina ng suporta ng DayRipple", "7. Mga pagbabago", "Ipapaalam ang mga pagbabago sa app o sa pahinang ito."
    ]),
    sv: privacyRecord([
      "DayRipples integritetspolicy", "Gäller från: 15 juli 2026", "DayRipple (”Tjänsten”) behandlar dina personuppgifter omsorgsfullt och följer tillämplig lagstiftning, inklusive Koreas lag om skydd av personuppgifter.", "Radering av konto och data", "Du kan radera kontot direkt under <b>Inställningar → Konto → Radera konto</b>. Om du inte kan använda appen, använd <a href=\"./delete-account.html\">sidan för begäran om radering</a>.",
      "1. Personuppgifter vi samlar in", ["Kategori","Uppgifter","När de samlas in"], [["Konto","E-postadress, krypterade autentiseringsuppgifter, smeknamn, användar-ID","Vid registrering eller social inloggning"],["Valfri inställning","Samtycke till eller avböjande av produktförbättringsanalys","När du väljer"],["Användning av Tjänsten","Händelser, årsdagar／D-dagar, uppgifter, namn på utrymmen och medlemssammansättning","När du själv anger dem"],["Enhet och notiser","Push-token, operativsystem, språk, tidszon, samtycke per typ, senaste användning","När notiser aktiveras eller appen används"],["Betalning","Transaktions- och produkt-ID, köp／återbetalningsstatus, slumpmässig identifierare för koppling","Vid köp i appen"],["Anonym statistik","Namn och normaliserade kategorier för slutförda huvudåtgärder, version, system, anonym installationsidentifierare","Efter uttryckligt tillstånd"],["Fel","Version, system, feltyp／kodplats, internt användar-ID","Vid fel eller krasch"]],
      "Betalningar behandlas av Apple App Store eller Google Play. Tjänsten samlar inte in eller lagrar kortnummer, bankkontonummer eller andra uppgifter om betalningsmetoder.", "PostHog-statistik och Sentry-rapporter innehåller inte e-post, smeknamn, namn på utrymmen, relationstyp, inbjudningskoder／länkar, titlar eller anteckningar för händelser, årsdagar och uppgifter, eller betalnings-ID och token. Vi samlar inte in reklamidentifierare, plats, kontakter, foton eller aktivitet i andra företags appar och webbplatser och använder inte skärminspelning eller sessionsuppspelning.",
      "2. Ändamål", ["Identifiering och inloggning","Delning av händelser, årsdagar och uppgifter mellan inbjudna medlemmar","Utskick av påminnelser och aktivitetsnotiser","Med separat tillstånd, återengagemangsnotiser anpassade till språk, tidszon och utrymmets status","Verifiering av livstidsåtkomst／extra platser och justering efter återbetalning eller avbokning","Funktionsförbättring genom anonym analys endast med uttryckligt tillstånd","Felhantering och förebyggande av dubbla debiteringar eller bedrägeri"],
      "3. Lagring och radering", ["När kontot raderas tar vi utan dröjsmål bort konto, profil, medlemskap, enhetstoken, analysval och innehåll du skapat.","Utrymmen som bara du använde raderas helt. Delade utrymmen överförs till kvarvarande medlemmar, men ditt innehåll raderas.","Ett delat utrymmes köprättighet kan finnas kvar för att skydda andra medlemmar, men utan koppling till det raderade kontot.","PostHog används anonymt utan konto-ID eller personliga profiler. Vid utloggning eller radering återställs enhetens anonyma identifierare och aggregerade data kopplas inte på nytt.","Sentry-rapporter sparas endast så länge de behövs för driften och raderas därefter. Du kan begära radering av befintliga rapporter.","Betalningsuppgifter som måste sparas enligt lag lagras separat under den lagstadgade tiden och förstörs sedan."],
      "Återbetalningar och datalagring", ["Om livstidsåtkomst återbetalas eller avbryts upphör betalfunktionerna och gratisgränserna gäller igen.","Transaktionsuppgifter för extra platser och data i utrymmet raderas inte omedelbart. Åtkomsten för medlemmar över kapaciteten kan pausas utan att data raderas.","När kapaciteten återställs med en giltig rättighet återfår medlemmar åtkomst i anslutningsordning. Kontoradering hanteras separat."],
      "4. Delning med tredje part och personuppgiftsbiträden", "Tjänsten säljer inte personuppgifter och använder dem inte för annonsspårning. Följande företag behandlar data som personuppgiftsbiträden för att driva Tjänsten.", ["Personuppgiftsbiträde","Uppgift","Lagringsplats"], [["Databas och autentiseringsserver","Seoul-regionen, Korea (AWS)"],["Utskick av tillåtna pushnotiser","USA"],["Social inloggning, köp och kvittoverifiering","Enligt respektive företags policy"],["Anonym statistik med uttryckligt tillstånd","USA och andra tjänsteregioner"],["Fel- och kraschrapporter","USA och andra tjänsteregioner"]],
      "5. Dina rättigheter", "Produktförbättringsanalys är avstängd som standard. Vi initierar inte PostHog eller skickar statistik före ditt val. Valet sparas på kontot och enheten och respekteras efter ominstallation eller enhetsbyte. Du kan stänga av analysen när som helst; därefter skickas inga nya PostHog-händelser. Du kan också redigera profilen och radera kontot i inställningarna; utan åtkomst till appen använder du <a href=\"./delete-account.html\">begäran om radering på webben</a>.", "6. Personuppgiftsansvarig och kontakt", "Personuppgiftsansvarig: Park Byungjun", "Kontakt", "DayRipples supportsida", "7. Ändringar", "Ändringar meddelas i appen eller på den här sidan."
    ]),
    da: privacyRecord([
      "DayRipples privatlivspolitik", "Ikrafttrædelsesdato: 15. juli 2026", "DayRipple (”Tjenesten”) behandler dine personoplysninger med omhu og overholder gældende lovgivning, herunder Sydkoreas lov om beskyttelse af personoplysninger.", "Sletning af konto og data", "Du kan slette kontoen med det samme under <b>Indstillinger → Konto → Slet konto</b>. Hvis du ikke kan bruge appen, kan du bruge <a href=\"./delete-account.html\">siden til anmodning om sletning</a>.",
      "1. Personoplysninger, vi indsamler", ["Kategori","Oplysninger","Hvornår"], [["Konto","E-mailadresse, krypterede loginoplysninger, kaldenavn, bruger-id","Ved tilmelding eller socialt login"],["Valgfri indstilling","Samtykke til eller fravalg af produktforbedrende analyse","Når du vælger"],["Brug af Tjenesten","Begivenheder, mærkedage／D-dage, opgaver, navne på rum og medlemssammensætning","Når du selv indtaster dem"],["Enhed og notifikationer","Pushtoken, styresystem, sprog, tidszone, samtykke pr. type, seneste brug","Når notifikationer slås til, eller appen bruges"],["Betaling","Transaktions- og produkt-id, købs-／refusionsstatus, tilfældig identifikator til sammenkædning","Ved køb i appen"],["Anonym statistik","Navne og normaliserede kategorier for gennemførte hovedhandlinger, appversion, styresystem, anonym installationsidentifikator","Efter udtrykkelig tilladelse"],["Fejl","Appversion, styresystem, fejltype／kodested, internt bruger-id","Ved fejl eller nedbrud"]],
      "Betalinger håndteres af Apple App Store eller Google Play. Tjenesten indsamler og opbevarer ikke kortnumre, kontonumre eller andre oplysninger om betalingsmidler.", "PostHog-statistik og Sentry-rapporter indeholder ikke e-mail, kaldenavn, navne på rum, relationstype, invitationskoder／links, titler eller noter på begivenheder, mærkedage og opgaver eller betalings-id og tokens. Vi indsamler ikke annonceidentifikatorer, placering, kontakter eller billeder, vi følger ikke din aktivitet i andre virksomheders apps og websteder, og vi bruger ikke skærmoptagelse eller sessionsafspilning.",
      "2. Formål", ["Identifikation og login","Deling af begivenheder, mærkedage og opgaver mellem inviterede medlemmer","Udsendelse af påmindelser og aktivitetsnotifikationer","Med særskilt tilladelse, genengagerende notifikationer tilpasset sprog, tidszone og rummets status","Kontrol af livstidsadgang／ekstra pladser og justering efter refusion eller annullering","Funktionsforbedring gennem anonym analyse, kun med udtrykkelig tilladelse","Fejlhåndtering og forebyggelse af dobbelte opkrævninger eller misbrug"],
      "3. Opbevaring og sletning", ["Når kontoen slettes, fjerner vi uden unødig forsinkelse konto, profil, medlemskaber, enhedstokens, analysevalg og det indhold, du har oprettet.","Rum, som kun du brugte, slettes helt. Delte rum overføres til de tilbageværende medlemmer, men dit indhold slettes.","Et delt rums købsrettighed kan blive tilbage for at beskytte de andre medlemmer, men uden forbindelse til den slettede konto.","PostHog bruges anonymt uden konto-id eller personlige profiler. Ved log ud eller sletning nulstilles enhedens anonyme identifikator, og allerede samlede data kædes ikke sammen igen.","Sentry-rapporter opbevares kun, så længe det er nødvendigt for driften, og slettes derefter. Du kan bede om at få eksisterende rapporter slettet.","Betalingsoplysninger, der efter loven skal opbevares, gemmes separat i den lovbestemte periode og destrueres derefter."],
      "Refusion og opbevaring af data", ["Hvis livstidsadgangen refunderes eller annulleres, stopper de betalte funktioner, og de gratis grænser gælder igen.","Transaktionsoplysninger for ekstra pladser og data i rummet slettes ikke med det samme. Adgang for medlemmer ud over kapaciteten kan sættes på pause uden at data slettes.","Når kapaciteten genoprettes med en gyldig rettighed, får medlemmerne adgang igen i den rækkefølge, de kom ind. Sletning af konto behandles særskilt."],
      "4. Deling med tredjeparter og databehandlere", "Tjenesten sælger ikke personoplysninger og bruger dem ikke til annoncesporing. Følgende virksomheder behandler data som databehandlere for at drive Tjenesten.", ["Databehandler","Opgave","Opbevaringssted"], [["Drift af database og godkendelsesserver","Seoul-regionen, Sydkorea (AWS)"],["Udsendelse af tilladte pushnotifikationer","USA"],["Socialt login, køb og kvitteringskontrol","Efter hver virksomheds egen politik"],["Anonym statistik med udtrykkelig tilladelse","USA og andre tjenesteregioner"],["Fejl- og nedbrudsrapporter","USA og andre tjenesteregioner"]],
      "5. Dine rettigheder", "Produktforbedrende analyse er slået fra som standard. Vi starter ikke PostHog og sender ingen statistik, før du har valgt. Valget gemmes på kontoen og enheden og respekteres efter geninstallation eller skift af enhed. Du kan slå analysen fra når som helst, hvorefter der ikke sendes nye PostHog-hændelser. Du kan også redigere profilen og slette kontoen i indstillingerne; uden adgang til appen kan du bruge <a href=\"./delete-account.html\">anmodningen om sletning på nettet</a>.", "6. Ansvarlig for personoplysninger og kontakt", "Ansvarlig: Park Byungjun", "Kontakt", "DayRipples supportside", "7. Ændringer", "Ændringer meddeles i appen eller på denne side."
    ]),
    nb: privacyRecord([
      "DayRipples personvernerklæring", "Gjelder fra: 15. juli 2026", "DayRipple («Tjenesten») behandler personopplysningene dine med omhu og følger gjeldende lovgivning, blant annet Sør-Koreas lov om vern av personopplysninger.", "Sletting av konto og data", "Du kan slette kontoen umiddelbart under <b>Innstillinger → Konto → Slett konto</b>. Hvis du ikke får brukt appen, kan du bruke <a href=\"./delete-account.html\">siden for forespørsel om sletting</a>.",
      "1. Personopplysninger vi samler inn", ["Kategori","Opplysninger","Når"], [["Konto","E-postadresse, krypterte påloggingsopplysninger, kallenavn, bruker-ID","Ved registrering eller sosial pålogging"],["Valgfri innstilling","Samtykke til eller avslag på produktforbedrende analyse","Når du velger"],["Bruk av Tjenesten","Hendelser, merkedager／D-dager, oppgaver, romnavn og medlemssammensetning","Når du selv legger dem inn"],["Enhet og varsler","Push-token, operativsystem, språk, tidssone, samtykke per type, siste bruk","Når varsler slås på eller appen brukes"],["Betaling","Transaksjons- og produkt-ID, kjøps-／refusjonsstatus, tilfeldig identifikator for kobling","Ved kjøp i appen"],["Anonym statistikk","Navn og normaliserte kategorier for fullførte hovedhandlinger, appversjon, operativsystem, anonym installasjonsidentifikator","Etter uttrykkelig tillatelse"],["Feil","Appversjon, operativsystem, feiltype／kodested, intern bruker-ID","Ved feil eller krasj"]],
      "Betalinger håndteres av Apple App Store eller Google Play. Tjenesten samler ikke inn og lagrer ikke kortnumre, kontonumre eller andre opplysninger om betalingsmåter.", "PostHog-statistikk og Sentry-rapporter inneholder ikke e-post, kallenavn, romnavn, relasjonstype, invitasjonskoder／lenker, titler eller notater for hendelser, merkedager og oppgaver, eller betalings-ID og tokener. Vi samler ikke inn annonseidentifikatorer, posisjon, kontakter eller bilder, vi sporer ikke aktiviteten din i andre selskapers apper og nettsteder, og vi bruker ikke skjermopptak eller øktavspilling.",
      "2. Formål", ["Identifisering og pålogging","Deling av hendelser, merkedager og oppgaver mellom inviterte medlemmer","Utsending av påminnelser og aktivitetsvarsler","Med egen tillatelse, gjeninnhentingsvarsler tilpasset språk, tidssone og rommets status","Kontroll av livstidstilgang／ekstra plasser og justering ved refusjon eller kansellering","Funksjonsforbedring gjennom anonym analyse, bare med uttrykkelig tillatelse","Feilhåndtering og forebygging av doble belastninger eller misbruk"],
      "3. Lagring og sletting", ["Når kontoen slettes, fjerner vi uten opphold konto, profil, medlemskap, enhetstokener, analysevalg og innholdet du har opprettet.","Rom som bare du brukte, slettes i sin helhet. Delte rom overføres til gjenværende medlemmer, men innholdet ditt slettes.","Et delt roms kjøpsrettighet kan bli værende for å beskytte de andre medlemmene, men uten kobling til den slettede kontoen.","PostHog brukes anonymt uten konto-ID eller personlige profiler. Ved utlogging eller sletting nullstilles enhetens anonyme identifikator, og allerede aggregerte data kobles ikke sammen på nytt.","Sentry-rapporter oppbevares bare så lenge det er nødvendig for driften, og slettes deretter. Du kan be om sletting av eksisterende rapporter.","Betalingsopplysninger som loven krever at vi oppbevarer, lagres separat i den lovbestemte perioden og destrueres deretter."],
      "Refusjon og datalagring", ["Hvis livstidstilgangen refunderes eller kanselleres, stopper de betalte funksjonene, og gratisgrensene gjelder igjen.","Transaksjonsopplysninger for ekstra plasser og data i rommet slettes ikke umiddelbart. Tilgangen for medlemmer utover kapasiteten kan settes på pause uten at data slettes.","Når kapasiteten gjenopprettes med en gyldig rettighet, får medlemmene tilgang igjen i den rekkefølgen de ble med. Kontosletting håndteres for seg."],
      "4. Deling med tredjeparter og databehandlere", "Tjenesten selger ikke personopplysninger og bruker dem ikke til annonsesporing. Følgende selskaper behandler data som databehandlere for å drive Tjenesten.", ["Databehandler","Oppgave","Lagringssted"], [["Drift av database og autentiseringsserver","Seoul-regionen, Sør-Korea (AWS)"],["Utsending av push-varsler du har tillatt","USA"],["Sosial pålogging, kjøp og kvitteringskontroll","Etter hvert selskaps egne retningslinjer"],["Anonym statistikk med uttrykkelig tillatelse","USA og andre tjenesteregioner"],["Feil- og krasjrapporter","USA og andre tjenesteregioner"]],
      "5. Rettighetene dine", "Produktforbedrende analyse er av som standard. Vi starter ikke PostHog og sender ingen statistikk før du har valgt. Valget lagres på kontoen og enheten og respekteres etter ny installasjon eller bytte av enhet. Du kan slå av analysen når som helst, og da sendes ingen nye PostHog-hendelser. Du kan også redigere profilen og slette kontoen i innstillingene; uten tilgang til appen kan du bruke <a href=\"./delete-account.html\">forespørselen om sletting på nettet</a>.", "6. Personvernansvarlig og kontakt", "Ansvarlig: Park Byungjun", "Kontakt", "DayRipples støtteside", "7. Endringer", "Endringer varsles i appen eller på denne siden."
    ]),
    fi: privacyRecord([
      "DayRipplen tietosuojakäytäntö", "Voimaantulopäivä: 15. heinäkuuta 2026", "DayRipple (”Palvelu”) käsittelee henkilötietojasi huolellisesti ja noudattaa sovellettavaa lainsäädäntöä, mukaan lukien Korean henkilötietojen suojaa koskeva laki.", "Tilin ja tietojen poistaminen", "Voit poistaa tilin heti kohdassa <b>Asetukset → Tili → Poista tili</b>. Jos et pysty käyttämään sovellusta, käytä <a href=\"./delete-account.html\">poistopyyntösivua</a>.",
      "1. Keräämämme henkilötiedot", ["Luokka","Tiedot","Milloin kerätään"], [["Tili","Sähköpostiosoite, salatut tunnistautumistiedot, kutsumanimi, käyttäjätunnus","Rekisteröitymisen tai sosiaalisen kirjautumisen yhteydessä"],["Valinnainen asetus","Suostumus tuotekehitysanalytiikkaan tai sen kieltäminen","Kun teet valinnan"],["Palvelun käyttö","Tapahtumat, vuosipäivät／D-päivät, tehtävät, tilojen nimet ja jäsenkokoonpano","Kun syötät ne itse"],["Laite ja ilmoitukset","Push-tunniste, käyttöjärjestelmä, kieli, aikavyöhyke, tyyppikohtainen suostumus, viimeisin käyttö","Kun ilmoitukset otetaan käyttöön tai sovellusta käytetään"],["Maksu","Tapahtuma- ja tuotetunnus, osto-／hyvitystila, satunnainen tunniste yhdistämistä varten","Sovelluksen sisäisessä ostossa"],["Nimetön tilasto","Suoritettujen päätoimintojen nimet ja normalisoidut luokat, sovellusversio, käyttöjärjestelmä, nimetön asennustunniste","Nimenomaisen luvan jälkeen"],["Virheet","Sovellusversio, käyttöjärjestelmä, virhetyyppi／koodin kohta, sisäinen käyttäjätunnus","Virheen tai kaatumisen yhteydessä"]],
      "Maksut käsittelee Apple App Store tai Google Play. Palvelu ei kerää eikä säilytä korttinumeroita, tilinumeroita tai muita maksutapatietoja.", "PostHog-tilastot ja Sentry-raportit eivät sisällä sähköpostia, kutsumanimeä, tilojen nimiä, suhdetyyppiä, kutsukoodeja／-linkkejä, tapahtumien, vuosipäivien ja tehtävien otsikoita tai muistiinpanoja eikä maksutunnuksia tai tokeneita. Emme kerää mainostunnisteita, sijaintia, yhteystietoja tai valokuvia, emmekä seuraa toimintaasi muiden yritysten sovelluksissa ja sivustoilla; emme käytä näytön tallennusta tai istuntotoistoa.",
      "2. Käyttötarkoitukset", ["Tunnistaminen ja kirjautuminen","Tapahtumien, vuosipäivien ja tehtävien jakaminen kutsuttujen jäsenten kesken","Muistutusten ja aktiviteetti-ilmoitusten lähettäminen","Erillisellä luvalla paluukehotteet, jotka on mukautettu kieleen, aikavyöhykkeeseen ja tilan tilanteeseen","Elinikäisen käyttöoikeuden／lisäpaikkojen tarkistus ja käyttöoikeuden muuttaminen hyvityksen tai peruutuksen jälkeen","Ominaisuuksien parantaminen nimettömän analyysin avulla vain nimenomaisella luvalla","Virheiden käsittely sekä kaksoisveloitusten ja väärinkäytön estäminen"],
      "3. Säilyttäminen ja poistaminen", ["Kun tili poistetaan, poistamme viipymättä tilin, profiilin, jäsenyydet, laitetunnisteet, analytiikkavalinnan ja luomasi sisällön.","Vain sinun käyttämäsi tilat poistetaan kokonaan. Jaetut tilat siirretään jäljelle jääville jäsenille, mutta sinun sisältösi poistetaan.","Jaetun tilan osto-oikeus voi jäädä voimaan muiden jäsenten suojaksi, mutta ilman yhteyttä poistettuun tiliin.","PostHogia käytetään nimettömästi ilman tilitunnuksia tai henkilöprofiileja. Uloskirjautumisen tai poiston yhteydessä laitteen nimetön tunniste nollataan, eikä koostettuja tietoja yhdistetä uudelleen.","Sentry-raportteja säilytetään vain niin kauan kuin toiminta edellyttää, minkä jälkeen ne poistetaan. Voit pyytää olemassa olevien raporttien poistoa.","Maksutiedot, jotka on lain mukaan säilytettävä, tallennetaan erikseen lakisääteisen ajan ja hävitetään sen jälkeen."],
      "Hyvitykset ja tietojen säilytys", ["Jos elinikäinen käyttöoikeus hyvitetään tai perutaan, maksulliset toiminnot lakkaavat ja ilmaisrajat astuvat taas voimaan.","Lisäpaikkojen tapahtumatietoja ja tilan tietoja ei poisteta heti. Kapasiteetin ylittävien jäsenten pääsy voidaan keskeyttää ilman tietojen poistamista.","Kun kapasiteetti palautetaan voimassa olevalla oikeudella, jäsenet saavat pääsyn takaisin liittymisjärjestyksessä. Tilin poisto käsitellään erikseen."],
      "4. Luovutus kolmansille ja käsittelijät", "Palvelu ei myy henkilötietoja eikä käytä niitä mainosseurantaan. Seuraavat yritykset käsittelevät tietoja käsittelijöinä Palvelun toiminnan mahdollistamiseksi.", ["Käsittelijä","Tehtävä","Säilytyspaikka"], [["Tietokannan ja tunnistautumispalvelimen ylläpito","Soulin alue, Korea (AWS)"],["Sallittujen push-ilmoitusten lähetys","Yhdysvallat"],["Sosiaalinen kirjautuminen, ostot ja kuittien tarkistus","Kunkin yrityksen oman käytännön mukaan"],["Nimetön tilastointi nimenomaisella luvalla","Yhdysvallat ja muut palvelualueet"],["Virhe- ja kaatumisraportit","Yhdysvallat ja muut palvelualueet"]],
      "5. Oikeutesi", "Tuotekehitysanalytiikka on oletuksena pois päältä. Emme käynnistä PostHogia emmekä lähetä tilastoja ennen valintaasi. Valinta tallennetaan tilille ja laitteeseen ja sitä noudatetaan uudelleenasennuksen tai laitteen vaihdon jälkeen. Voit poistaa analytiikan käytöstä milloin tahansa, minkä jälkeen uusia PostHog-tapahtumia ei lähetetä. Voit myös muokata profiilia ja poistaa tilin asetuksissa; jos et pääse sovellukseen, käytä <a href=\"./delete-account.html\">verkossa tehtävää poistopyyntöä</a>.", "6. Tietosuojavastaava ja yhteystiedot", "Vastaava: Park Byungjun", "Yhteystiedot", "DayRipplen tukisivu", "7. Muutokset", "Muutoksista ilmoitetaan sovelluksessa tai tällä sivulla."
    ]),
    sk: privacyRecord([
      "Zásady ochrany súkromia DayRipple", "Dátum účinnosti: 15. júla 2026", "DayRipple („Služba“) spracúva vaše osobné údaje starostlivo a dodržiava platné právne predpisy vrátane kórejského zákona o ochrane osobných údajov.", "Odstránenie účtu a údajov", "Účet môžete okamžite odstrániť v časti <b>Nastavenia → Účet → Odstrániť účet</b>. Ak aplikáciu nemôžete použiť, využite <a href=\"./delete-account.html\">stránku so žiadosťou o odstránenie</a>.",
      "1. Osobné údaje, ktoré zhromažďujeme", ["Kategória","Údaje","Kedy"], [["Účet","E-mailová adresa, šifrované prihlasovacie údaje, prezývka, ID používateľa","Pri registrácii alebo sociálnom prihlásení"],["Voliteľné nastavenie","Súhlas s analýzou na zlepšovanie produktu alebo jeho odmietnutie","Keď sa rozhodnete"],["Používanie Služby","Udalosti, výročia／D-dni, úlohy, názvy priestorov a zloženie členov","Keď ich sami zadáte"],["Zariadenie a oznámenia","Push token, operačný systém, jazyk, časové pásmo, súhlas podľa typu, posledné použitie","Pri zapnutí oznámení alebo používaní aplikácie"],["Platba","ID transakcie a produktu, stav nákupu／vrátenia, náhodný identifikátor na priradenie","Pri nákupe v aplikácii"],["Anonymná štatistika","Názvy a normalizované kategórie dokončených hlavných akcií, verzia aplikácie, operačný systém, anonymný identifikátor inštalácie","Po výslovnom povolení"],["Chyby","Verzia aplikácie, operačný systém, typ chyby／miesto v kóde, interné ID používateľa","Pri chybe alebo páde"]],
      "Platby spracúva Apple App Store alebo Google Play. Služba nezhromažďuje ani neuchováva čísla kariet, čísla účtov ani iné údaje o platobných prostriedkoch.", "Štatistiky PostHog a hlásenia Sentry neobsahujú e-mail, prezývku, názvy priestorov, typ vzťahu, kódy／odkazy pozvánok, názvy ani poznámky udalostí, výročí a úloh, ani ID platieb a tokeny. Nezhromažďujeme reklamné identifikátory, polohu, kontakty ani fotografie, nesledujeme vašu aktivitu v aplikáciách a na stránkach iných spoločností a nepoužívame nahrávanie obrazovky ani prehrávanie relácií.",
      "2. Účely použitia", ["Identifikácia a prihlásenie","Zdieľanie udalostí, výročí a úloh medzi pozvanými členmi","Odosielanie pripomienok a oznámení o aktivite","Po samostatnom povolení oznámenia na opätovné zapojenie prispôsobené jazyku, časovému pásmu a stavu priestoru","Overenie doživotného prístupu／dodatočných miest a úprava prístupu po vrátení platby alebo zrušení","Zlepšovanie funkcií anonymnou analýzou iba s výslovným povolením","Riešenie chýb a predchádzanie dvojitým platbám či zneužitiu"],
      "3. Uchovávanie a odstránenie", ["Pri odstránení účtu bezodkladne odstránime účet, profil, členstvá, tokeny zariadení, voľbu analýzy a obsah, ktorý ste vytvorili.","Priestory, ktoré ste používali sami, sa odstránia úplne. Zdieľané priestory sa prevedú na zostávajúcich členov, ale váš obsah sa odstráni.","Nárok na nákup zdieľaného priestoru môže zostať zachovaný na ochranu ostatných členov, ale bez väzby na odstránený účet.","PostHog sa používa anonymne bez ID účtu či osobných profilov. Pri odhlásení alebo odstránení sa anonymný identifikátor zariadenia vynuluje a už agregované údaje sa opätovne nespájajú.","Hlásenia Sentry sa uchovávajú len tak dlho, ako je to potrebné na prevádzku, a potom sa odstránia. Odstránenie existujúcich hlásení si môžete vyžiadať.","Platobné záznamy, ktoré je podľa zákona potrebné uchovávať, sa uchovávajú oddelene počas zákonnej lehoty a následne sa zničia."],
      "Vrátenie platby a uchovávanie údajov", ["Ak sa doživotný prístup vráti alebo zruší, platené funkcie sa zastavia a znova platia bezplatné limity.","Záznamy o transakciách dodatočných miest a údaje v priestore sa neodstraňujú okamžite. Prístup členov nad rámec kapacity možno pozastaviť bez odstránenia údajov.","Po obnovení kapacity platným nárokom získajú členovia prístup späť v poradí pripojenia. Odstránenie účtu sa rieši samostatne."],
      "4. Poskytovanie tretím stranám a sprostredkovatelia", "Služba nepredáva osobné údaje a nepoužíva ich na reklamné sledovanie. Nasledujúce spoločnosti spracúvajú údaje ako sprostredkovatelia, aby Služba mohla fungovať.", ["Sprostredkovateľ","Úloha","Miesto uloženia"], [["Prevádzka databázy a overovacieho servera","Región Soul, Kórea (AWS)"],["Odosielanie povolených push oznámení","Spojené štáty"],["Sociálne prihlásenie, nákupy a overovanie potvrdeniek","Podľa politiky každej spoločnosti"],["Anonymná štatistika s výslovným povolením","Spojené štáty a ďalšie regióny služby"],["Hlásenia o chybách a pádoch","Spojené štáty a ďalšie regióny služby"]],
      "5. Vaše práva", "Analýza na zlepšovanie produktu je predvolene vypnutá. PostHog nespúšťame a štatistiky neodosielame skôr, než sa rozhodnete. Voľba sa uloží k účtu a do zariadenia a rešpektuje sa aj po preinštalovaní alebo výmene zariadenia. Analýzu môžete kedykoľvek vypnúť; potom sa už žiadne nové udalosti PostHog neodosielajú. V nastaveniach môžete tiež upraviť profil a odstrániť účet; ak sa do aplikácie nedostanete, použite <a href=\"./delete-account.html\">webovú žiadosť o odstránenie</a>.", "6. Zodpovedná osoba a kontakt", "Zodpovedná osoba: Park Byungjun", "Kontakt", "Stránka podpory DayRipple", "7. Zmeny", "Zmeny oznámime v aplikácii alebo na tejto stránke."
    ]),
    ru: privacyRecord([
      "Политика конфиденциальности DayRipple", "Дата вступления в силу: 15 июля 2026 г.", "DayRipple («Сервис») бережно обрабатывает ваши персональные данные и соблюдает применимое законодательство, включая Закон Республики Корея о защите персональных данных.", "Удаление аккаунта и данных", "Аккаунт можно удалить сразу в разделе <b>Настройки → Аккаунт → Удалить аккаунт</b>. Если приложение недоступно, воспользуйтесь <a href=\"./delete-account.html\">страницей запроса на удаление</a>.",
      "1. Собираемые персональные данные", ["Категория","Данные","Когда собираются"], [["Аккаунт","Адрес электронной почты, зашифрованные учётные данные, никнейм, идентификатор пользователя","При регистрации или входе через соцсеть"],["Необязательная настройка","Согласие на аналитику для улучшения продукта или отказ от неё","Когда вы делаете выбор"],["Использование Сервиса","События, годовщины／D-day, задачи, названия пространств и состав участников","Когда вы вводите их сами"],["Устройство и уведомления","Push-токен, операционная система, язык, часовой пояс, согласие по типам, последнее использование","При включении уведомлений или использовании приложения"],["Оплата","Идентификатор транзакции и товара, статус покупки／возврата, случайный идентификатор для сопоставления","При покупке в приложении"],["Анонимная статистика","Названия и нормализованные категории завершённых основных действий, версия приложения, система, анонимный идентификатор установки","После явного разрешения"],["Ошибки","Версия приложения, система, тип ошибки／место в коде, внутренний идентификатор пользователя","При ошибке или сбое"]],
      "Платежи обрабатывает Apple App Store или Google Play. Сервис не собирает и не хранит номера карт, номера счетов и другие данные платёжных средств.", "Статистика PostHog и отчёты Sentry не содержат электронную почту, никнейм, названия пространств, тип отношений, коды／ссылки приглашений, заголовки и заметки событий, годовщин и задач, а также идентификаторы платежей и токены. Мы не собираем рекламные идентификаторы, местоположение, контакты и фотографии, не отслеживаем вашу активность в приложениях и на сайтах других компаний и не используем запись экрана или воспроизведение сессий.",
      "2. Цели использования", ["Идентификация и вход","Совместное использование событий, годовщин и задач между приглашёнными участниками","Отправка напоминаний и уведомлений об активности","При отдельном разрешении — уведомления о возвращении, адаптированные к языку, часовому поясу и состоянию пространства","Проверка доступа навсегда／дополнительных мест и изменение доступа после возврата или отмены","Улучшение функций с помощью анонимной аналитики только при явном разрешении","Обработка ошибок и предотвращение повторных списаний и мошенничества"],
      "3. Хранение и удаление", ["При удалении аккаунта мы без промедления удаляем аккаунт, профиль, участие, токены устройств, выбор аналитики и созданное вами содержимое.","Пространства, которыми пользовались только вы, удаляются полностью. Общие пространства передаются оставшимся участникам, но ваше содержимое удаляется.","Право на покупку общего пространства может сохраниться для защиты других участников, но без связи с удалённым аккаунтом.","PostHog используется анонимно, без идентификаторов аккаунта и личных профилей. При выходе или удалении анонимный идентификатор устройства сбрасывается, а уже собранные данные повторно не связываются.","Отчёты Sentry хранятся только столько, сколько необходимо для работы Сервиса, затем удаляются. Вы можете запросить удаление существующих отчётов.","Платёжные записи, которые требуется хранить по закону, хранятся отдельно в течение установленного срока и затем уничтожаются."],
      "Возврат средств и хранение данных", ["Если доступ навсегда возвращён или отменён, платные функции отключаются и снова действуют бесплатные ограничения.","Записи о транзакциях дополнительных мест и данные пространства не удаляются сразу. Доступ участников сверх вместимости может быть приостановлен без удаления данных.","После восстановления вместимости действующим правом участники получают доступ в порядке присоединения. Удаление аккаунта обрабатывается отдельно."],
      "4. Передача третьим лицам и обработчики", "Сервис не продаёт персональные данные и не использует их для рекламного отслеживания. Перечисленные компании обрабатывают данные как обработчики, чтобы Сервис работал.", ["Обработчик","Задача","Место хранения"], [["Работа базы данных и сервера аутентификации","Регион Сеул, Корея (AWS)"],["Отправка разрешённых push-уведомлений","США"],["Вход через соцсети, покупки и проверка чеков","Согласно политике каждой компании"],["Анонимная статистика при явном разрешении","США и другие регионы обслуживания"],["Отчёты об ошибках и сбоях","США и другие регионы обслуживания"]],
      "5. Ваши права", "Аналитика для улучшения продукта выключена по умолчанию. Мы не запускаем PostHog и не отправляем статистику до вашего выбора. Выбор сохраняется в аккаунте и на устройстве и учитывается после переустановки или смены устройства. Аналитику можно отключить в любой момент — после этого новые события PostHog не отправляются. В настройках также можно изменить профиль и удалить аккаунт; если приложение недоступно, воспользуйтесь <a href=\"./delete-account.html\">веб-запросом на удаление</a>.", "6. Ответственный за персональные данные и контакты", "Ответственный: Park Byungjun", "Связаться с нами", "Страница поддержки DayRipple", "7. Изменения", "Об изменениях мы сообщим в приложении или на этой странице."
    ]),
    hr: privacyRecord([
      "Pravila privatnosti aplikacije DayRipple", "Datum stupanja na snagu: 15. srpnja 2026.", "DayRipple („Usluga“) pažljivo obrađuje vaše osobne podatke i poštuje mjerodavne propise, uključujući korejski Zakon o zaštiti osobnih podataka.", "Brisanje računa i podataka", "Račun možete odmah izbrisati u <b>Postavke → Račun → Izbriši račun</b>. Ako ne možete koristiti aplikaciju, upotrijebite <a href=\"./delete-account.html\">stranicu za zahtjev za brisanje</a>.",
      "1. Osobni podaci koje prikupljamo", ["Kategorija","Podaci","Kada"], [["Račun","Adresa e-pošte, šifrirani podaci za prijavu, nadimak, ID korisnika","Pri registraciji ili prijavi putem društvene mreže"],["Neobavezna postavka","Privola za analitiku poboljšanja proizvoda ili njezino odbijanje","Kada odaberete"],["Korištenje Usluge","Događaji, godišnjice／D-dani, zadaci, nazivi prostora i sastav članova","Kada ih sami unesete"],["Uređaj i obavijesti","Push token, operacijski sustav, jezik, vremenska zona, privola po vrsti, zadnje korištenje","Pri uključivanju obavijesti ili korištenju aplikacije"],["Plaćanje","ID transakcije i proizvoda, status kupnje／povrata, nasumični identifikator za povezivanje","Pri kupnji u aplikaciji"],["Anonimna statistika","Nazivi i normalizirane kategorije dovršenih glavnih radnji, verzija aplikacije, sustav, anonimni identifikator instalacije","Nakon izričitog dopuštenja"],["Pogreške","Verzija aplikacije, sustav, vrsta pogreške／mjesto u kodu, interni ID korisnika","Pri pogrešci ili rušenju"]],
      "Plaćanja obrađuje Apple App Store ili Google Play. Usluga ne prikuplja i ne pohranjuje brojeve kartica, brojeve računa ni druge podatke o načinima plaćanja.", "Statistika PostHoga i izvješća Sentryja ne sadrže e-poštu, nadimak, nazive prostora, vrstu odnosa, kodove／poveznice pozivnica, naslove ni bilješke događaja, godišnjica i zadataka, kao ni ID-jeve plaćanja i tokene. Ne prikupljamo oglasne identifikatore, lokaciju, kontakte ni fotografije, ne pratimo vašu aktivnost u aplikacijama i na stranicama drugih tvrtki i ne koristimo snimanje zaslona ni reprodukciju sesija.",
      "2. Svrhe obrade", ["Identifikacija i prijava","Dijeljenje događaja, godišnjica i zadataka među pozvanim članovima","Slanje podsjetnika i obavijesti o aktivnosti","Uz zasebno dopuštenje, obavijesti za ponovno uključivanje prilagođene jeziku, vremenskoj zoni i stanju prostora","Provjera doživotnog pristupa／dodatnih mjesta i prilagodba nakon povrata ili otkazivanja","Poboljšanje značajki anonimnom analizom samo uz izričito dopuštenje","Rješavanje pogrešaka i sprječavanje dvostrukih naplata ili zlouporabe"],
      "3. Čuvanje i brisanje", ["Pri brisanju računa bez odgode uklanjamo račun, profil, članstva, tokene uređaja, odabir analitike i sadržaj koji ste stvorili.","Prostori koje ste koristili samo vi brišu se u cijelosti. Dijeljeni prostori prenose se preostalim članovima, ali vaš se sadržaj briše.","Pravo na kupnju dijeljenog prostora može ostati radi zaštite drugih članova, ali bez veze s izbrisanim računom.","PostHog se koristi anonimno, bez ID-a računa i osobnih profila. Pri odjavi ili brisanju anonimni identifikator uređaja se poništava, a već prikupljeni podaci se ponovno ne povezuju.","Izvješća Sentryja čuvaju se samo dok je to potrebno za rad, a zatim se brišu. Možete zatražiti brisanje postojećih izvješća.","Podaci o plaćanju koje je po zakonu potrebno čuvati pohranjuju se odvojeno tijekom zakonskog roka i potom uništavaju."],
      "Povrati i čuvanje podataka", ["Ako se doživotni pristup vrati ili otkaže, plaćene značajke prestaju, a ponovno vrijede besplatna ograničenja.","Podaci o transakcijama dodatnih mjesta i podaci prostora ne brišu se odmah. Pristup članovima iznad kapaciteta može se privremeno obustaviti bez brisanja podataka.","Kada se kapacitet obnovi valjanim pravom, članovi ponovno dobivaju pristup redoslijedom pridruživanja. Brisanje računa rješava se zasebno."],
      "4. Dijeljenje s trećim stranama i izvršitelji obrade", "Usluga ne prodaje osobne podatke i ne koristi ih za oglasno praćenje. Sljedeće tvrtke obrađuju podatke kao izvršitelji obrade radi rada Usluge.", ["Izvršitelj obrade","Zadaća","Mjesto pohrane"], [["Rad baze podataka i poslužitelja za autentifikaciju","Regija Seoul, Koreja (AWS)"],["Slanje push obavijesti koje ste dopustili","Sjedinjene Države"],["Prijava putem društvenih mreža, kupnje i provjera računa","Prema pravilima svake tvrtke"],["Anonimna statistika uz izričito dopuštenje","Sjedinjene Države i druge regije usluge"],["Izvješća o pogreškama i rušenjima","Sjedinjene Države i druge regije usluge"]],
      "5. Vaša prava", "Analitika poboljšanja proizvoda prema zadanome je isključena. PostHog ne pokrećemo i statistiku ne šaljemo prije vašeg odabira. Odabir se sprema na račun i uređaj te se poštuje nakon ponovne instalacije ili zamjene uređaja. Analitiku možete isključiti u bilo kojem trenutku; nakon toga nove se PostHog radnje ne šalju. U postavkama možete i urediti profil te izbrisati račun; ako ne možete pristupiti aplikaciji, upotrijebite <a href=\"./delete-account.html\">web zahtjev za brisanje</a>.", "6. Voditelj obrade i kontakt", "Odgovorna osoba: Park Byungjun", "Kontakt", "Stranica podrške za DayRipple", "7. Izmjene", "O izmjenama ćemo obavijestiti u aplikaciji ili na ovoj stranici."
    ]),
    sl: privacyRecord([
      "Politika zasebnosti DayRipple", "Datum začetka veljavnosti: 15. julij 2026", "DayRipple (»Storitev«) skrbno obdeluje vaše osebne podatke in upošteva veljavne predpise, vključno s korejskim zakonom o varstvu osebnih podatkov.", "Izbris računa in podatkov", "Račun lahko takoj izbrišete v <b>Nastavitve → Račun → Izbriši račun</b>. Če aplikacije ne morete uporabiti, uporabite <a href=\"./delete-account.html\">stran z zahtevo za izbris</a>.",
      "1. Osebni podatki, ki jih zbiramo", ["Kategorija","Podatki","Kdaj"], [["Račun","E-poštni naslov, šifrirani podatki za prijavo, vzdevek, ID uporabnika","Ob registraciji ali prijavi z družbenim računom"],["Neobvezna nastavitev","Privolitev v analitiko za izboljšave ali njena zavrnitev","Ko se odločite"],["Uporaba Storitve","Dogodki, obletnice／D-dnevi, opravila, imena prostorov in sestava članov","Ko jih sami vnesete"],["Naprava in obvestila","Potisni žeton, operacijski sistem, jezik, časovni pas, privolitev po vrstah, zadnja uporaba","Ob vklopu obvestil ali uporabi aplikacije"],["Plačilo","ID transakcije in izdelka, stanje nakupa／vračila, naključni identifikator za povezovanje","Ob nakupu v aplikaciji"],["Anonimna statistika","Imena in normalizirane kategorije dokončanih glavnih dejanj, različica aplikacije, sistem, anonimni identifikator namestitve","Po izrecnem dovoljenju"],["Napake","Različica aplikacije, sistem, vrsta napake／mesto v kodi, notranji ID uporabnika","Ob napaki ali sesutju"]],
      "Plačila obdeluje Apple App Store ali Google Play. Storitev ne zbira in ne hrani številk kartic, številk računov ali drugih podatkov o plačilnih sredstvih.", "Statistika PostHog in poročila Sentry ne vsebujejo e-pošte, vzdevka, imen prostorov, vrste odnosa, kod／povezav povabil, naslovov ali zapiskov dogodkov, obletnic in opravil ter ID-jev plačil in žetonov. Ne zbiramo oglaševalskih identifikatorjev, lokacije, stikov ali fotografij, ne sledimo vaši dejavnosti v aplikacijah in na spletiščih drugih podjetij ter ne uporabljamo snemanja zaslona ali predvajanja sej.",
      "2. Nameni obdelave", ["Identifikacija in prijava","Deljenje dogodkov, obletnic in opravil med povabljenimi člani","Pošiljanje opomnikov in obvestil o dejavnosti","Ob ločenem dovoljenju obvestila za ponovno vključitev, prilagojena jeziku, časovnemu pasu in stanju prostora","Preverjanje doživljenjskega dostopa／dodatnih mest in prilagoditev po vračilu ali preklicu","Izboljševanje funkcij z anonimno analizo samo ob izrecnem dovoljenju","Odpravljanje napak ter preprečevanje dvojnih bremenitev in zlorab"],
      "3. Hramba in izbris", ["Ob izbrisu računa nemudoma odstranimo račun, profil, članstva, žetone naprav, izbiro analitike in vsebino, ki ste jo ustvarili.","Prostori, ki ste jih uporabljali samo vi, se izbrišejo v celoti. Deljeni prostori se prenesejo na preostale člane, vaša vsebina pa se izbriše.","Pravica do nakupa deljenega prostora lahko ostane zaradi zaščite drugih članov, vendar brez povezave z izbrisanim računom.","PostHog uporabljamo anonimno, brez ID-jev računa in osebnih profilov. Ob odjavi ali izbrisu se anonimni identifikator naprave ponastavi, že zbrani podatki pa se ponovno ne povezujejo.","Poročila Sentry hranimo le toliko časa, kolikor je potrebno za delovanje, nato jih izbrišemo. Izbris obstoječih poročil lahko zahtevate.","Podatki o plačilih, ki jih je po zakonu treba hraniti, se hranijo ločeno v zakonsko določenem obdobju in nato uničijo."],
      "Vračila in hramba podatkov", ["Če je doživljenjski dostop vrnjen ali preklican, se plačljive funkcije ustavijo in znova veljajo brezplačne omejitve.","Podatki o transakcijah dodatnih mest in podatki prostora se ne izbrišejo takoj. Dostop članov nad zmogljivostjo je lahko začasno zaustavljen, ne da bi se podatki izbrisali.","Ko je zmogljivost obnovljena z veljavno pravico, člani znova dobijo dostop po vrstnem redu pridružitve. Izbris računa obravnavamo ločeno."],
      "4. Razkritje tretjim osebam in pogodbena obdelava", "Storitev osebnih podatkov ne prodaja in jih ne uporablja za oglaševalsko sledenje. Naslednja podjetja obdelujejo podatke kot pogodbeni obdelovalci, da Storitev deluje.", ["Obdelovalec","Naloga","Mesto hrambe"], [["Delovanje zbirke podatkov in strežnika za preverjanje pristnosti","Regija Seul, Koreja (AWS)"],["Pošiljanje dovoljenih potisnih obvestil","Združene države"],["Prijava z družbenim računom, nakupi in preverjanje računov","V skladu s politiko posameznega podjetja"],["Anonimna statistika ob izrecnem dovoljenju","Združene države in druge regije storitve"],["Poročila o napakah in sesutjih","Združene države in druge regije storitve"]],
      "5. Vaše pravice", "Analitika za izboljšave je privzeto izklopljena. PostHoga ne zaženemo in statistike ne pošiljamo pred vašo izbiro. Izbira se shrani v račun in napravo ter se upošteva po ponovni namestitvi ali zamenjavi naprave. Analitiko lahko kadar koli izklopite; po tem se novi dogodki PostHog ne pošiljajo. V nastavitvah lahko tudi uredite profil in izbrišete račun; če do aplikacije ne morete dostopati, uporabite <a href=\"./delete-account.html\">spletno zahtevo za izbris</a>.", "6. Pooblaščena oseba in stik", "Odgovorna oseba: Park Byungjun", "Stik", "Stran podpore za DayRipple", "7. Spremembe", "O spremembah bomo obvestili v aplikaciji ali na tej strani."
    ]),
    hi: privacyRecord([
      "DayRipple प्राइवेसी पॉलिसी", "लागू होने की तारीख़: 15 जुलाई 2026", "DayRipple (“सेवा”) आपकी निजी जानकारी को सावधानी से संभालती है और कोरिया के व्यक्तिगत सूचना संरक्षण अधिनियम समेत लागू क़ानूनों का पालन करती है।", "अकाउंट और डेटा डिलीट करना", "आप अकाउंट तुरंत <b>सेटिंग → अकाउंट → अकाउंट डिलीट करें</b> में डिलीट कर सकते हैं। अगर ऐप इस्तेमाल न कर पाएँ, तो <a href=\"./delete-account.html\">डिलीट अनुरोध वाला पेज</a> इस्तेमाल करें।",
      "1. हम जो निजी जानकारी जुटाते हैं", ["श्रेणी","जानकारी","कब"], [["अकाउंट","ईमेल पता, एन्क्रिप्टेड लॉगिन जानकारी, निकनेम, यूज़र ID","साइन अप या सोशल लॉगिन के समय"],["वैकल्पिक सेटिंग","प्रोडक्ट सुधार एनालिटिक्स की सहमति या इनकार","जब आप चुनते हैं"],["सेवा का इस्तेमाल","इवेंट, सालगिरह／D-day, टास्क, स्पेस के नाम और सदस्य","जब आप ख़ुद दर्ज करते हैं"],["डिवाइस और नोटिफ़िकेशन","पुश टोकन, ऑपरेटिंग सिस्टम, भाषा, टाइम ज़ोन, प्रकार के अनुसार सहमति, आख़िरी इस्तेमाल","नोटिफ़िकेशन चालू करने या ऐप चलाने पर"],["पेमेंट","ट्रांज़ैक्शन और प्रोडक्ट ID, ख़रीद／रिफ़ंड की स्थिति, जोड़ने के लिए रैंडम पहचानकर्ता","ऐप में ख़रीद के समय"],["अनाम आँकड़े","पूरी हुई मुख्य क्रियाओं के नाम और सामान्यीकृत श्रेणियाँ, ऐप वर्शन, सिस्टम, अनाम इंस्टॉल पहचानकर्ता","साफ़ अनुमति मिलने के बाद"],["एरर","ऐप वर्शन, सिस्टम, एरर का प्रकार／कोड में जगह, आंतरिक यूज़र ID","एरर या क्रैश होने पर"]],
      "पेमेंट Apple App Store या Google Play प्रोसेस करता है। सेवा कार्ड नंबर, बैंक खाता नंबर या पेमेंट के दूसरे विवरण न जुटाती है, न रखती है।", "PostHog के आँकड़े और Sentry की रिपोर्ट में ईमेल, निकनेम, स्पेस के नाम, रिश्ते का प्रकार, इनवाइट कोड／लिंक, इवेंट, सालगिरह और टास्क के शीर्षक या नोट, तथा पेमेंट ID और टोकन शामिल नहीं होते। हम विज्ञापन पहचानकर्ता, लोकेशन, कॉन्टैक्ट या फ़ोटो नहीं जुटाते, दूसरी कंपनियों के ऐप और साइटों पर आपकी गतिविधि ट्रैक नहीं करते, और स्क्रीन रिकॉर्डिंग या सेशन रीप्ले इस्तेमाल नहीं करते।",
      "2. इस्तेमाल के उद्देश्य", ["पहचान और लॉगिन","इनवाइट किए गए सदस्यों के बीच इवेंट, सालगिरह और टास्क शेयर करना","रिमाइंडर और गतिविधि नोटिफ़िकेशन भेजना","अलग से अनुमति मिलने पर भाषा, टाइम ज़ोन और स्पेस की स्थिति के अनुसार वापसी नोटिफ़िकेशन","लाइफ़टाइम पास／अतिरिक्त सीट की जाँच और रिफ़ंड या रद्द होने पर पहुँच में बदलाव","सिर्फ़ साफ़ अनुमति के साथ अनाम विश्लेषण से फ़ीचर बेहतर करना","एरर संभालना और दोहरे चार्ज या दुरुपयोग रोकना"],
      "3. रखना और डिलीट करना", ["अकाउंट डिलीट होने पर हम बिना देरी अकाउंट, प्रोफ़ाइल, सदस्यता, डिवाइस टोकन, एनालिटिक्स चुनाव और आपका बनाया कंटेंट हटा देते हैं।","सिर्फ़ आपके इस्तेमाल किए स्पेस पूरी तरह डिलीट हो जाते हैं। शेयर किए गए स्पेस बचे हुए सदस्यों को मिल जाते हैं, पर आपका कंटेंट डिलीट होता है।","दूसरे सदस्यों की सुरक्षा के लिए शेयर किए गए स्पेस का ख़रीद अधिकार बना रह सकता है, पर डिलीट किए अकाउंट से बिना किसी लिंक के।","PostHog अनाम रूप से इस्तेमाल होता है — न अकाउंट ID, न निजी प्रोफ़ाइल। लॉगआउट या डिलीट पर डिवाइस का अनाम पहचानकर्ता रीसेट हो जाता है और पहले जुटाए गए आँकड़े दोबारा नहीं जोड़े जाते।","Sentry की रिपोर्ट सिर्फ़ ज़रूरत भर रखी जाती हैं, फिर डिलीट कर दी जाती हैं। मौजूदा रिपोर्ट डिलीट कराने का अनुरोध किया जा सकता है।","जिन पेमेंट रिकॉर्ड को क़ानूनन रखना ज़रूरी है, उन्हें तय अवधि तक अलग रखा जाता है और फिर नष्ट कर दिया जाता है।"],
      "रिफ़ंड और डेटा रखना", ["लाइफ़टाइम पास रिफ़ंड या रद्द होने पर पेड फ़ीचर बंद हो जाते हैं और मुफ़्त सीमाएँ फिर लागू हो जाती हैं।","अतिरिक्त सीट के ट्रांज़ैक्शन रिकॉर्ड और स्पेस का डेटा तुरंत डिलीट नहीं होता। क्षमता से ज़्यादा सदस्यों की पहुँच रोकी जा सकती है, पर डेटा नहीं मिटाया जाता।","वैध अधिकार से क्षमता बहाल होने पर सदस्यों को जुड़ने के क्रम में पहुँच वापस मिल जाती है। अकाउंट डिलीट करना अलग से देखा जाता है।"],
      "4. तीसरे पक्ष के साथ साझा करना और प्रोसेसिंग", "सेवा निजी जानकारी न बेचती है, न विज्ञापन ट्रैकिंग के लिए इस्तेमाल करती है। सेवा चलाने के लिए नीचे दी कंपनियाँ प्रोसेसर के रूप में डेटा संभालती हैं।", ["प्रोसेसर","काम","स्टोरेज की जगह"], [["डेटाबेस और ऑथेंटिकेशन सर्वर चलाना","सियोल रीजन, कोरिया (AWS)"],["आपकी अनुमति वाले पुश नोटिफ़िकेशन भेजना","अमेरिका"],["सोशल लॉगिन, ख़रीद और रसीद जाँच","हर कंपनी की अपनी नीति के अनुसार"],["साफ़ अनुमति के साथ अनाम आँकड़े","अमेरिका और सेवा के दूसरे रीजन"],["एरर और क्रैश रिपोर्ट","अमेरिका और सेवा के दूसरे रीजन"]],
      "5. आपके अधिकार", "प्रोडक्ट सुधार एनालिटिक्स डिफ़ॉल्ट रूप से बंद रहती है। आपके चुनाव से पहले हम न PostHog शुरू करते हैं, न आँकड़े भेजते हैं। यह चुनाव अकाउंट और डिवाइस पर सेव होता है और दोबारा इंस्टॉल करने या डिवाइस बदलने पर भी माना जाता है। एनालिटिक्स कभी भी बंद की जा सकती है; उसके बाद कोई नया PostHog इवेंट नहीं भेजा जाता। सेटिंग में प्रोफ़ाइल बदली और अकाउंट डिलीट भी किया जा सकता है; ऐप तक पहुँच न हो तो <a href=\"./delete-account.html\">वेब पर डिलीट अनुरोध</a> इस्तेमाल करें।", "6. निजता अधिकारी और संपर्क", "अधिकारी: Park Byungjun", "संपर्क करें", "DayRipple सपोर्ट पेज", "7. बदलाव", "बदलाव होने पर हम ऐप में या इस पेज पर सूचित करेंगे।"
    ])
};

  var processorNames = ["Supabase Inc.", "Expo (650 Industries, Inc.)", "Apple / Google", "PostHog, Inc.", "Functional Software, Inc. (Sentry)"];

  function renderPrivacy(locale, data) {
    var rows = data.rows.map(function (row) {
      return "<tr><td>" + row[0] + "</td><td>" + row[1] + "</td><td>" + row[2] + "</td></tr>";
    }).join("");
    var processors = data.processorTasks.map(function (row, index) {
      return "<tr><td>" + processorNames[index] + "</td><td>" + row[0] + "</td><td>" + row[1] + "</td></tr>";
    }).join("");
    return "<h1>" + data.heading + "</h1><p>" + data.effective + "</p><p>" + data.intro + "</p>" +
      "<div class=\"notice\"><strong>" + data.deletionTitle + "</strong><br>" + data.deletion + "</div>" +
      "<h2>" + data.collectTitle + "</h2><table><tr><th>" + data.headers.join("</th><th>") + "</th></tr>" + rows + "</table>" +
      "<p>" + data.payment + "</p><p>" + data.excluded + "</p>" +
      "<h2>" + data.purposesTitle + "</h2><ul>" + data.purposes.map(function (item) { return "<li>" + item + "</li>"; }).join("") + "</ul>" +
      "<h2>" + data.retentionTitle + "</h2><ul>" + data.retention.map(function (item) { return "<li>" + item + "</li>"; }).join("") + "</ul>" +
      "<h2>" + data.refundTitle + "</h2><ul>" + data.refunds.map(function (item) { return "<li>" + item + "</li>"; }).join("") + "</ul>" +
      "<h2>" + data.processorsTitle + "</h2><p>" + data.processorsIntro + "</p>" +
      "<table><tr><th>" + data.processorHeaders.join("</th><th>") + "</th></tr>" + processors + "</table>" +
      "<h2>" + data.rightsTitle + "</h2><p>" + data.rights + "</p>" +
      "<h2>" + data.officerTitle + "</h2><ul><li>" + data.officer + "</li><li>" + data.contact + ": <a href=\"mailto:ehxhfl92@gmail.com\">ehxhfl92@gmail.com</a></li><li><a href=\"./support.html\">" + data.support + "</a></li></ul>" +
      "<h2>" + data.changesTitle + "</h2><p>" + data.changes + "</p>";
  }

  function renderSupport(locale, data) {
    return "<h1>" + pageTitles.support[locale] + "</h1>" +
      "<p>" + data.intro + "</p>" +
      "<h2>" + data.contact + "</h2>" +
      "<p><a href=\"mailto:ehxhfl92@gmail.com?subject=DayRipple%20support\">ehxhfl92@gmail.com</a></p>" +
      "<h2>" + data.paymentTitle + "</h2><p>" + data.payment + "</p>" +
      "<h2>" + data.deleteTitle + "</h2><p>" + data.delete + "</p>" +
      "<p><a href=\"./index.html\">" + data.privacy + "</a></p>";
  }

  function renderDelete(locale, data) {
    return "<h1>" + data.heading + "</h1><p>" + data.intro + "</p>" +
      "<h2>" + data.instantTitle + "</h2><div class=\"card\">" + data.instant + "</div>" +
      "<h2>" + data.noAccessTitle + "</h2><p>" + data.noAccess + "</p>" +
      "<p><a class=\"button\" href=\"mailto:ehxhfl92@gmail.com?subject=DayRipple%20account%20deletion%20request\">" + data.button + "</a></p>" +
      "<p>Email: <a href=\"mailto:ehxhfl92@gmail.com\">ehxhfl92@gmail.com</a></p>" +
      "<h2>" + data.deletedTitle + "</h2><ul>" + data.items.map(function (item) { return "<li>" + item + "</li>"; }).join("") + "</ul>" +
      "<p>" + data.retention + "</p><p>" + data.timing + "</p>" +
      "<p><a href=\"./index.html\">" + data.privacy + "</a> · <a href=\"./support.html\">" + data.support + "</a></p>";
  }

  function normalizeLocale(value) {
    var normalized = String(value || "").replace("_", "-").toLowerCase();
    if (normalized.indexOf("zh") === 0) {
      return /hant|tw|hk|mo/.test(normalized) ? "zh-Hant" : "zh-Hans";
    }
    if (/^pt-pt(?:-|$)/.test(normalized)) return "pt-PT";
    if (normalized.indexOf("pt") === 0) return "pt-BR";
    var language = normalized.split("-")[0];
    return locales.indexOf(language) >= 0 ? language : "en";
  }

  function selectedLocale() {
    var query = new URLSearchParams(location.search).get("lang");
    var stored = null;
    try { stored = localStorage.getItem("dr_lang"); } catch (error) {}
    return normalizeLocale(query || stored || navigator.language || "en");
  }

  function activateLocale(locale) {
    var selected = normalizeLocale(locale);
    document.documentElement.setAttribute("data-lang", selected);
    document.documentElement.lang = selected;
    document.title = pageTitles[page][selected] || pageTitles[page].en;
    document.querySelectorAll(".langbar button").forEach(function (button) {
      var active = button.getAttribute("data-locale") === selected;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    try { localStorage.setItem("dr_lang", selected); } catch (error) {}
  }

  function init() {
    if (!page || !pageTitles[page]) return;
    var bar = document.querySelector(".langbar");
    if (!bar) return;
    locales.forEach(function (locale) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = labels[locale];
      button.setAttribute("data-locale", locale);
      button.addEventListener("click", function () { activateLocale(locale); });
      bar.appendChild(button);
    });

    Object.keys(page === "support" ? supportData : page === "delete" ? deleteData : privacyData)
      .forEach(function (locale) {
        var section = document.createElement("div");
        section.setAttribute("data-lang-content", locale);
        section.innerHTML = page === "support"
          ? renderSupport(locale, supportData[locale])
          : page === "delete"
            ? renderDelete(locale, deleteData[locale])
            : renderPrivacy(locale, privacyData[locale]);
        document.body.insertBefore(section, document.body.lastElementChild);
      });

    var style = document.createElement("style");
    style.textContent = locales.map(function (locale) {
      return "html[data-lang=\"" + locale + "\"] [data-lang-content=\"" + locale + "\"]{display:block}";
    }).join("\n");
    document.head.appendChild(style);
    activateLocale(selectedLocale());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
