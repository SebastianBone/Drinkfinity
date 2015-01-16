# require 'zurb-foundation'
# Require any additional compass plugins here.


# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "javascripts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass


Compass::Frameworks.register("sassy-math", :path => "#{File.dirname(__FILE__)}/..")

# Sassy math Functions
module Sass::Script::Functions
  # Exponents
  def exponent(base, powerNum, powerDen)
    base = base.value.to_f
    powerNum = powerNum.value.to_f
    powerDen = powerDen.value.to_f
    result = base ** (powerNum / powerDen)
    Sass::Script::Number.new(result)
  end
  def power(base, exponent)
    base = base.value.to_f
    exponent = exponent.value.to_f
    result = base ** exponent
    Sass::Script::Number.new(result)
  end
  def sqrt(number)
    number = number.value.to_f
    result = Math.sqrt(number)
    Sass::Script::Number.new(result)
  end
  def nth_root(number, root)
    number = number.value.to_f
    root = root.value.to_f
    result = number ** (1.0 / root)
    Sass::Script::Number.new(result)
  end
  # Logarithms
  def ln(num)
    result = Math.log(num.value)
    Sass::Script::Number.new(result)
  end
  def log10(num)
    result = Math.log10(num.value)
    Sass::Script::Number.new(result)
  end
  # Miscellaneous
  def factorial(number)
    result = 1
    number = number.value
    if number > 0
      (1..number).each do |i|
        result = result * i
      end 
    end 
    Sass::Script::Number.new(result)
  end
  def random(max = Sass::Script::Number.new(100)) ## shamelessly taken from here: https://gist.github.com/1561650
    Sass::Script::Number.new(rand(max.value), max.numerator_units, max.denominator_units)
  end
  def hypot(a, b)
    a = a.value.to_f
    b = b.value.to_f
    result = Math.hypot(a, b)
    Sass::Script::Number.new(result)
  end
  # Constants
  def pi
    pi = Math::PI
    Sass::Script::Number.new(pi)
  end
  def e
    e = Math::E
    Sass::Script::Number.new(e)
  end
  def golden_ratio()
    result = (1.0 / 2.0) + (Math.sqrt(5) / 2.0)
    Sass::Script::Number.new(result)
  end
  # Comparative Functions
  def is_int(number)
    number = number.value.to_f
    if number - number.floor != 0
      result = false
    else
      result = true
    end
    Sass::Script::Bool.new(result)
  end
  def is_float(number)
    number = number.value
    if number - number.floor != 0
      result = true
    else
      result = false
    end
    Sass::Script::Bool.new(result)
  end
  # Trigonometric Functions
  def deg_to_rad(degree)
    result = degree.value.to_f * Math::PI / 180
    Sass::Script::Number.new(result)
  end
  def rad_to_deg(rad)
    result = rad.value.to_f * 180 / Math::PI
    Sass::Script::Number.new(result)
  end
  def cosh(rad)
    rad = rad.value.to_f
    result = Math.cosh(rad)
    Sass::Script::Number.new(result)
  end
  def acos(rad)
    rad = rad.value.to_f
    result = Math.acos(rad)
    Sass::Script::Number.new(result)
  end
  def acosh(rad)
    rad = rad.value.to_f
    result = Math.acosh(rad)
    Sass::Script::Number.new(result)
  end
  def sinh(rad)
    rad = rad.value.to_f
    result = Math.sinh(rad)
    Sass::Script::Number.new(result)
  end
  def asin(rad)
    rad = rad.value.to_f
    result = Math.asin(rad)
    Sass::Script::Number.new(result)
  end
  def asinh(rad)
    rad = rad.value.to_f
    result = Math.asinh(rad)
    Sass::Script::Number.new(result)
  end
  def tanh(rad)
    rad = rad.value.to_f
    result = Math.tanh(rad)
    Sass::Script::Number.new(result)
  end
  def atan(rad)
    rad = rad.value.to_f
    result = Math.atan(rad)
    Sass::Script::Number.new(result)
  end
  def atan2(y, x)
    y = y.value.to_f
    x = x.value.to_f
    result = Math.atan2(y, x)
    Sass::Script::Number.new(result)
  end
  def atanh(rad)
    rad = rad.value.to_f
    result = Math.atanh(rad)
    Sass::Script::Number.new(result)
  end
end

module SassyMath
  
  VERSION = "1.5"
  DATE = "2012-07-29"

end

extension_path = File.expand_path(File.join(File.dirname(__FILE__), ".."))
Compass::Frameworks.register('modular-scale', :path => extension_path)

# Version and date of version for your Compass extension.
# Replace Extension with the name of your extension
#  Letters, numbers, and underscores only
#  Version is a number. If a version contains alphas, it will be created as
#    a prerelease version
#  Date is in the form of YYYY-MM-DD
module ModularScale
  VERSION = "1.0.6"
  DATE = "2012-08-13"
end

# This is where any custom SassScript should be placed. The functions will be  
#  available on require of your extension without the need for users to import
#  any partials. Uncomment below.

# Modular Scale Sass Script
module Sass::Script
  class Number < Literal
    # Comparison
    def <=>(other)
      value <=> other.value
    end
  end
end

module Sass::Script::Functions
  # Modular Scale
  def double_octave
    value = 4 / 1.0
    Sass::Script::Number.new(value)
  end
  def major_twelfth
    value = 3 / 1.0
    Sass::Script::Number.new(value)
  end
  def major_eleventh
    value = 8 / 3.0
    Sass::Script::Number.new(value)
  end
  def major_tenth
    value = 5 / 2.0
    Sass::Script::Number.new(value)
  end
  def octave
    value = 2 / 1.0
    Sass::Script::Number.new(value)
  end
  def major_seventh
    value = 15 / 8.0
    Sass::Script::Number.new(value)
  end
  def minor_seventh
    value = 16 /9.0
    Sass::Script::Number.new(value)
  end
  def major_sixth
    value = 5 / 3.0
    Sass::Script::Number.new(value)
  end
  def minor_sixth
    value = 8 / 5.0
    Sass::Script::Number.new(value)
  end
  def fifth
    value = 3 / 2.0
    Sass::Script::Number.new(value)
  end
  def augmented_fourth
    value = Math.sqrt(2) / 1.0
    Sass::Script::Number.new(value)
  end
  def fourth
    value = 4 / 3.0
    Sass::Script::Number.new(value)
  end
  def major_third
    value = 5 / 4.0
    Sass::Script::Number.new(value)
  end
  def minor_third
    value = 6 / 5.0
    Sass::Script::Number.new(value)
  end
  def major_second
    value = 9 / 8.0
    Sass::Script::Number.new(value)
  end
  def minor_second
    value = 16 / 15.0
    Sass::Script::Number.new(value)
  end

  # Lists
  def sort_list(list)
    sep = list.separator if list.is_a?(Sass::Script::List)
    list = list.to_a.sort
    Sass::Script::List.new(list, sep)
  end
  def reverse_list(list)
    sep = list.separator if list.is_a?(Sass::Script::List)
    list = list.to_a.reverse
    Sass::Script::List.new(list, sep)
  end
  def trim_list(list, threshold, ascending)
    # remove list items above or below a threshold
    sep = list.separator if list.is_a?(Sass::Script::List)
    list = list.to_a
    if ascending.value
      list = list.delete_if {
        |x| x.value <= threshold.value
      }
    else
      list = list.delete_if {
        |x| x.value >= threshold.value
      }
    end
    Sass::Script::List.new(list, sep)
  end
end
