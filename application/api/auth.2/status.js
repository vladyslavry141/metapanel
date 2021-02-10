({
  access: 'public',
  async method() {
    const status = context.token ? true : false;
    return { result: status };
  }
});
