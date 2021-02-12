({
  access: 'public',
  async method() {
    const status = !!context.token;
    return { result: status };
  }
});
