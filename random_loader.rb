module Jekyll
  class RandomLoader < Generator
    def generate(site)
      random_js = File.read('random.js')
      site.pages.each do |page|
        page.content = page.content + "<script>#{random_js}</script>"
      end
    end
  end
end