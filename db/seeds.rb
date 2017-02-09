# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

class DataLoader
  attr_reader :csv, :row

  def initialize
    csv_text = File.read('data/starter.csv')
    @csv = CSV.parse(csv_text, :headers => true)
  end

  def load
    csv.each do |row|
      @row = row
      puts "Creating new photo..."
      photo =                   Photo.new
      photo.title =             row['Title']
      photo.caption =           row['Description']
      photo.date =              parse_date_from_row(row)
      photo.remote_image_url =  row['URL']
      photo.save!
      puts "New Photo created with attributes: #{photo.title} #{photo.caption} #{photo.date} #{photo.image_url}"
    end
  end

  def parse_date_from_row(row)
    year =  row['Year'].to_i
    month = row['Month'].to_i
    day =   row['Day'].to_i

    Date.new(year, month, day)
  end
end

DataLoader.new.load
