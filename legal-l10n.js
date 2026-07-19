(function () {
  "use strict";

  var script = document.currentScript;
  var page = script && script.getAttribute("data-page");
  var locales = ["ko", "en", "ja", "zh-Hans", "zh-Hant", "vi", "es", "pt-BR", "de", "fr", "id"];
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
  };

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
