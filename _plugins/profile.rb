module ProfilePlugin
    class ProfilePageGenerator < Jekyll::Generator
      safe true
  
      def generate(site)
        site.data['users'].each do | _, user |
          site.pages << ProfilePage.new(site, user)
        end
      end
    end
  
    # Subclass of `Jekyll::Page` with custom method definitions.
    class ProfilePage < Jekyll::Page
      def initialize(site, user)
        @site = site             # the current site instance.
        @base = site.source      # path to the source directory.
        @username = user["username"]
        @dir  = "profiles/" + @username + "/"     # the directory the page will reside in.
        
        # All pages have the same filename, so define attributes straight away.
        @basename = 'index'      # filename without the extension.
        @ext      = '.html'      # the extension.
        @name     = 'index.html' # basically @basename + @ext.
        
        # Look up front matter defaults scoped to type `categories`, if given key
        # doesn't exist in the `data` hash.
        # data.default_proc = proc do |_, key|
        #   site.frontmatter_defaults.find(relative_path, :categories, key)
        # end
        
        template = "profile"
        self.process(@name)

        if @site.layouts[template].path.end_with? 'html'
          @path = @site.layouts[template].path.dup
        else
          @path = File.join(@site.layouts[template].path, @site.layouts[template].name)
        end
  
        base_path = @site.layouts[template].path
        base_path.slice! @site.layouts[template].name
        self.read_yaml(base_path, @site.layouts[template].name)

        @data['user'] = user

        # @data['twitte'] = @site.twitter.select { |n| n.username == user.username }
      end
  
      # Placeholders that are used in constructing page URL.
      def url_placeholders
        {
          :profile => @username,
          :path   => @dir,
          :basename   => basename,
          :output_ext => output_ext,
        }
      end
    end
  end