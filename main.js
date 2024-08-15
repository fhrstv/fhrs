<script>
    // قائمة بالملفات التي تريد منع الوصول إليها
    const restrictedFiles = ['/random.js'];

    // فحص عنوان URL الحالي
    const currentPath = window.location.pathname;

    if (restrictedFiles.includes(currentPath)) {
        window.location.href = '/404.html';
    }
</script>