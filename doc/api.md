# توثيق واجهات برمجة التطبيقات (API)

## نظرة عامة

يوفر هذا المستند تفاصيل حول واجهات برمجة التطبيقات (APIs) التي يستخدمها مشروع Altaqwaa. يتضمن هذا التوثيق النقاط النهائية (endpoints)، وأمثلة الطلبات، والردود.

## نقاط النهاية (Endpoints)

### /api/users

- **الوصف**: الحصول على قائمة المستخدمين.
- **الطريقة**: GET
- **الاستجابة**:
  ```json
  [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
  ```

### /api/users/:id

- **الوصف**: الحصول على تفاصيل مستخدم محدد.
- **الطريقة**: GET
- **الاستجابة**:
  ```json
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

### /api/users

- **الوصف**: إضافة مستخدم جديد.
- **الطريقة**: POST
- **الطلب**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
  ```
- **الاستجابة**:
  ```json
  {
    "id": "2",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
  ```

### /api/users/:id

- **الوصف**: تحديث تفاصيل مستخدم.
- **الطريقة**: PUT
- **الطلب**:
  ```json
  {
    "name": "Jane Smith"
  }
  ```
- **الاستجابة**:
  ```json
  {
    "id": "2",
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
  ```

### /api/users/:id

- **الوصف**: حذف مستخدم.
- **الطريقة**: DELETE
- **الاستجابة**:
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

## الرموز الحالة

- **200 OK**: الطلب ناجح.
- **201 Created**: تم إنشاء المورد بنجاح.
- **400 Bad Request**: طلب غير صحيح.
- **404 Not Found**: المورد غير موجود.
- **500 Internal Server Error**: خطأ في الخادم.