#!c:\Perl64\bin\perl.exe
use strict;
 use JSON;
my $infile = $ARGV[0];
my $outfolder = $ARGV[1];
if( ! defined $outfolder ) {
	print "asdasd";
	($outfolder) = split(/\./ , $infile );
	if( ! -d $outfolder ) {
		mkdir( $outfolder, 0777);
	}
}
my $fh;
open($fh, "<", $infile) || die "can not read input file:" . $! . "\n";
##Wall 					# 	 -> 1
##Player 				@    -> 4
##Player on goal square +    -> 7
##Box 					$ 	 -> 2
##Box on goal square 	*  	 ->5
##Goal square			. 	 -> 3
##Floor 			(Space)  -> 0
my $file = 0;
my $filecount = 0;
my $outfh;
my $data = [];
while(<$fh>) {

	if( m/<Level / ) {
			$filecount++;
			$file = 1;
			$data = [];
			next;
	}
	if(m/<L>([#@+\$\.\* ]+)<\/L>/ && $file) {
		my $x = $1;
		if($x =~ m/^(\s*)(#.*)$/) {
			$x = $2;
			for(my $i = 0 ; $i < length( $1 ) ; $i++ ) {
				$x = "6" . $x;
			}
		}
		if($x =~ m/^(.*#)(\s*)$/) {
			$x = $1;
			for(my $i = 0 ; $i < length( $2 ) ; $i++ ) {
				$x = $x ."6";
			}
		}		
		$x =~ s/#/1/g;
		$x =~ s/\@/4/g;
		$x =~ s/\+/7/g;
		$x =~ s/\$/2/g;
		$x =~ s/\./3/g;
		$x =~ s/\*/5/g;
		$x =~ s/ /0/g;
		my @line = split('', $x);
#		if( scalar( @line ) > 16 || scalar( @{$data} ) > 16 ) { # Level to big
#			$data = [];
#			$file = 0;
#			$filecount--;
#			next;
#		}
		push @{$data}, \@line;
		next;
	}
	if( $file ) {
		open($outfh, ">", $outfolder . "\\" . $filecount. ".json" ) || die "can not write  file:" . $! . "\n";
	#	print to_json($data);
		print $outfh to_json($data);
		close($outfh);
		$data=[];
		$file= 0;
	}
}